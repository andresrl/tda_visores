<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

const DELAY_SLIDER_EMOCIONES = 10 * 1000;
const DELAY_SLIDER_TIEMPO_REAL = 20 * 1000;
const DELAY_SLIDER_POSTS = 30 * 1000;

const REFRESH_DATA_INTERVAL = 30 * 1000;

const modules = [EffectFade, Autoplay, Pagination, Navigation];
const swiperInstance = ref(null);
const currentSlideIndex = ref(0);

const runtimeConfig = useRuntimeConfig();

let checkConnectionId;
let intervalData;
const loading = ref(true);
const miSwiper = ref(null);
const connectionLost = ref(false);
const fichas = ref([]);
const tiempoReal = ref({});
const posts = ref([]);

const fetchDataEmociones = async () => {
  const result = await $fetch(
    runtimeConfig.public.NODE_SERVER_URL + "/api/get-goli-data",
  );

  const updatedFichas = result
    .filter((ficha) => ficha.Anhelo)
    .map((ficha, index) => {
      return {
        nombre: ficha.__EMPTY.toLowerCase().trim(),
        admiration: ficha["Admiración "],
        longing: ficha["Anhelo"],
        devotion: ficha["Devoción"],
        enthusiasm: ficha["Entusiasmo "],
        fervency: ficha["Fervor "],
        optimism: ficha["Gozo"],
        surprise: ficha["Sorpresa "],
        tenderness: ficha["Ternura"],
        reacciones: ficha["TOTAL REACCIONES"],
      };
    });

  // Si se añaden o elimian, sobrescribimos array entero

  if (updatedFichas.length !== fichas.value.length) {
    return (fichas.value = updatedFichas);
  }

  updatedFichas.forEach((updatedFicha, index) => {
    if (index < fichas.value.length) {
      fichas.value[index].optimism = updatedFicha.optimism;
      fichas.value[index].reacciones = updatedFicha.reacciones;
      fichas.value[index].tenderness = updatedFicha.tenderness;
      fichas.value[index].admiration = updatedFicha.admiration;
      fichas.value[index].devotion = updatedFicha.devotion;
      fichas.value[index].enthusiasm = updatedFicha.enthusiasm;
      fichas.value[index].fervency = updatedFicha.fervency;
      fichas.value[index].longing = updatedFicha.longing;
      fichas.value[index].surprise = updatedFicha.surprise;
    } else {
      fichas.value.push(updatedFicha);
    }
  });
};

const fetchDataTiempoReal = async () => {
  const goli2 = (
    await $fetch(runtimeConfig.public.NODE_SERVER_URL + "/api/get-goli-2-data")
  )[0];

  // TODO
  const api2 = {
    companies: 2371,
    professionals: 346,
    meetings: 122,
  };

  // const goli2 = await $fetch(
  //   runtimeConfig.public.NODE_SERVER_URL + "/api/TODO",
  // );

  tiempoReal.value = {
    ...goli2,
    ...api2,
  };
};

const fetchDataPosts = async () => {
  // const result = await $fetch(
  //   "/api/get-posts",
  // );
  // posts.value = result;

  // TODO
  const updatedPosts = [
    {
      photo: "/img/photos/aaaa.jpg",
      title: "Título Título 1",
      text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
    },
    {
      photo: "/img/photos/bbbb.jpg",
      title: "Título Título 2",
      text: "A lo largo de los años, se ha desarrollado mucho software de publicación de escritorio como Aldus PageMaker, incluyendo versiones de Lorem Ipsum. Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
    },
    {
      photo: "/img/photos/cccc.jpg",
      title: "Título Título 3",
      text: "El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como 'Contenido aquí, contenido aquí', haciendo que se vea como texto legible.",
    },
    {
      photo: "/img/photos/dddd.jpg",
      title: "Título Título 4",
      text: "Muchos paquetes de publicación de escritorio y editores de páginas web usan Lorem Ipsum como su texto por defecto, y una búsqueda de 'lorem ipsum' va a dar por resultado muchos sitios web que todavía están en su infancia.",
    },
    {
      photo: "/img/photos/eeee.jpg",
      title: "Título Título 5",
      text: "Existen muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría han sufrido alteraciones de alguna forma, ya sea por inserción de humor o palabras aleatorias que no parecen ni un poco creíbles.",
    },
  ];

  // Si se añaden o elimian, sobrescribimos array entero
  if (updatedPosts.length !== posts.value.length) {
    return (posts.value = updatedPosts);
  }

  updatedPosts.forEach((updatedPost, index) => {
    if (index < posts.value.length) {
      posts.value[index].photo = updatedPost.photo;
      posts.value[index].title = updatedPost.title;
      posts.value[index].text = updatedPost.text;
    } else {
      posts.value.push(updatedPost);
    }
  });
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  swiperInstance.value.on("slideChange", () => {
    currentSlideIndex.value = swiperInstance.value.realIndex;

    let delay = DELAY_SLIDER_EMOCIONES;
    if (currentSlideIndex.value === fichas.value.length) {
      delay = DELAY_SLIDER_TIEMPO_REAL;
    } else if (currentSlideIndex.value > fichas.value.length) {
      delay = DELAY_SLIDER_POSTS;
    }
    swiperInstance.value.params.autoplay.delay = delay;
  });
};

onBeforeMount(() => {
  intervalData = setInterval(async () => {
    fetchDataEmociones();
    fetchDataTiempoReal();
    fetchDataPosts();
  }, REFRESH_DATA_INTERVAL);

  fetchDataEmociones();
  fetchDataTiempoReal();
  fetchDataPosts();

  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

onMounted(() => {
  checkConnectionId = setInterval(async () => {
    try {
      await $fetch(runtimeConfig.public.NODE_SERVER_URL + "/api/ping/");
      connectionLost.value = false;
    } catch (error) {
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 500
      ) {
        connectionLost.value = true;
      }
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalData);
  clearInterval(checkConnectionId);
});
</script>

<template>
  <NotFound v-if="connectionLost" />

  <Swiper
    v-else-if="!loading"
    ref="miSwiper"
    @swiper="onSwiper"
    :modules="modules"
    :autoplay="{ delay: DELAY_SLIDER_EMOCIONES, disableOnInteraction: false }"
    :loop="true"
  >
    <SwiperSlide v-for="(ficha, index) in fichas" :key="ficha">
      <SlideEmocion
        :ficha="ficha"
        :current-slide-index="currentSlideIndex"
        :index="index"
      />
    </SwiperSlide>

    <SwiperSlide>
      <SlideTiempoReal
        :current-slide-index="currentSlideIndex"
        :index="fichas.length"
        :tiempo-real="tiempoReal"
      />
    </SwiperSlide>
    <SwiperSlide v-for="(post, index) in posts" :key="post">
      <SlideCompanyPost
        :post="post"
        :index="fichas.length + 1 + index"
        :current-slide-index="currentSlideIndex"
      />
    </SwiperSlide>
  </Swiper>
</template>
