<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import SlideEmocion from "~/components/SlideEmocion.vue";

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

const fetchData = async () => {
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

  updatedFichas.forEach((updatedFicha) => {
    const index = fichas.value.findIndex(
      (f) => f.nombre === updatedFicha.nombre,
    );
    if (index !== -1) {
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

  loading.value = false;
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  swiperInstance.value.on("slideChange", () => {
    currentSlideIndex.value = swiperInstance.value.realIndex;
  });
};

onBeforeMount(() => {
  intervalData = setInterval(async () => {
    fetchData();
  }, 5000);

  fetchData();
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
    :autoplay="{ delay: 6000, disableOnInteraction: false }"
    :loop="true"
  >
    <SwiperSlide v-for="(ficha, index) in fichas" :key="ficha">
      <SlideEmocion
        :ficha="ficha"
        :current-slide-index="currentSlideIndex"
        :index="index"
      />
    </SwiperSlide>
  </Swiper>
</template>
