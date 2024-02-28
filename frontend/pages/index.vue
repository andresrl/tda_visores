<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import SlideEmocion from "~/components/SlideEmocion.vue";

const modules = [EffectFade, Autoplay, Pagination, Navigation];

const runtimeConfig = useRuntimeConfig();

let checkConnectionId;
let intervalData;
const miSwiper = ref(null);
const connectionLost = ref(false);
const fichas = ref([]);

const fetchData = async () => {
  const result = await $fetch(
    runtimeConfig.public.NODE_SERVER_URL + "/api/get-goli-data",
  );

  fichas.value = result
    .filter((ficha) => ficha.Anhelo)
    .map((ficha) => {
      return {
        nombre: ficha.__EMPTY,
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
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalData);
  clearInterval(checkConnectionId);
});
</script>

<template>
  <NotFound v-if="connectionLost" />

  <Swiper
    v-else
    ref="miSwiper"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :modules="modules"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    :loop="true"
  >
    <SwiperSlide v-for="ficha in fichas" :key="ficha">
      <SlideEmocion :ficha="ficha" />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.mainWrapper {
  width: 2160px;
  height: 3840px;
  background-color: #f1f1f1;
}

//1.54
</style>
