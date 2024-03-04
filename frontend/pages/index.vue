<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

const DELAY_SLIDER_EMOCIONES = 10 * 1000;
const DELAY_SLIDER_TIEMPO_REAL = 7 * 1000;
const DELAY_SLIDER_POSTS = 7 * 1000;

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

  // Si se añaden o eliminan, sobrescribimos array entero
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
    edad: goli2.edad,
    visitantes: goli2.visitantes,
    "emocion predominante": goli2["emocion predominante"],
    hombres: goli2.hombres,
    mujeres: goli2.mujeres,

    companies: api2.companies,
    professionals: api2.professionals,
    meetings: api2.meetings,
  };
};

const fetchDataPosts = async () => {
  const BEARER_TOKEN =
    "Bearer 5|ne4srosIMQWM3lTyAZfIH28RONnIvinPDOhu7qdWb65ac5d3";
  const API_ENDPOINT = "https://andalusiancrushlink.com/api";

  const { data } = await $fetch(`${API_ENDPOINT}/companies`, {
    headers: {
      Authorization: BEARER_TOKEN,
    },
  });

  const updatedPosts = data.filter((c) => !!c.featured_offer);

  if (posts.value.length > updatedPosts.length) {
    posts.value.splice(
      posts.value.length,
      posts.value.length - updatedPosts.length,
    );
  }

  updatedPosts.forEach((updatedPost, index) => {
    if (index < posts.value.length) {
      posts.value[index] = updatedPost;
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

    // Hay dos slides de tiempo real
    if (
      currentSlideIndex.value === fichas.value.length ||
      currentSlideIndex.value === fichas.value.length + 1
    ) {
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
    <SwiperSlide v-for="(ficha, index) in fichas" :key="`ficha-${index}`">
      <SlideEmocion
        :ficha="ficha"
        :current-slide-index="currentSlideIndex"
        :index="index"
      />
    </SwiperSlide>

    <SwiperSlide key="tiemporeal-1">
      <SlideTiempoReal
        :current-slide-index="currentSlideIndex"
        :index="fichas.length"
        :tiempo-real="tiempoReal"
      />
    </SwiperSlide>

    <SwiperSlide key="tiemporeal-2">
      <SlideTiempoRealSegunda
        :current-slide-index="currentSlideIndex"
        :index="fichas.length + 1"
        :tiempo-real="tiempoReal"
      />
    </SwiperSlide>

    <SwiperSlide v-for="(post, index) in posts" :key="`post-${index}`">
      <SlideCompanyPost
        :empresa="post"
        :index="fichas.length + 2 + index"
        :current-slide-index="currentSlideIndex"
      />
    </SwiperSlide>
  </Swiper>
</template>
