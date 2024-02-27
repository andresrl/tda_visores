<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import SlideEmocion from "~/components/SlideEmocion.vue";

const miSwiper = ref(null);
const modules = [EffectFade, Autoplay, Pagination, Navigation];

const runtimeConfig = useRuntimeConfig();

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
        admiracion: ficha["Admiración "],
        anhelo: ficha["Anhelo"],
        devotion: ficha["Devoción"],
        entusiasmo: ficha["Entusiasmo "],
        fervor: ficha["Fervor "],
        gozo: ficha["Gozo"],
        sorpresa: ficha["Sorpresa "],
        ternura: ficha["Ternura"],
        reacciones: ficha["TOTAL REACCIONES"],
      };
    });
};

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <Swiper
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
