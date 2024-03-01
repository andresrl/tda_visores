<script setup>
const props = defineProps({
  currentSlideIndex: Number,
  index: Number,
  empresa: Object,
});

const isAnimated = computed(() => {
  return props.currentSlideIndex === props.index;
});
</script>
<template>
  <div
    class="wrapper"
    :class="{ 'animate__animated animate__fadeIn': isAnimated }"
  >
    <img
      src="/img/logo.png"
      alt="Logo"
      class="logo"
      :class="{ 'animate__animated animate__bounceIn': isAnimated }"
    />
    <img
      :src="empresa.featured_offer.image"
      :alt="empresa.featured_offer.title"
      class="foto"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    />
    <div
      style="display: flex; padding: 3em 6em"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    >
      <div>
        <div class="nombre">
          {{ empresa.company_trade_name }}
        </div>
        <div class="ciudad">
          {{ empresa?.locality }}
        </div>
        <div class="sector">
          {{ empresa?.company_type?.name }}
        </div>
      </div>
      <div v-if="empresa.meeting_spaces.length" class="mesa">
        {{ empresa.meeting_spaces[0]?.table_name }}
      </div>
    </div>

    <h1 :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      {{ empresa.featured_offer.title }}
    </h1>

    <div
      class="descripcion"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    >
      {{ empresa.featured_offer.description }}
    </div>

    <img
      :src="empresa.full_url_logo"
      :alt="empresa.company_trade_name"
      style="height: 400px; object-fit: contain"
      class="foto"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    />
    <footer>
      <img src="/img/footer.png" alt="Footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$verde: #4db88c;

$verde-claro: #04c783;

.wrapper {
  display: flex;
  flex-direction: column;
  background: black;
  min-height: 100vh;
}

footer {
  background: $verde-claro;
  padding: 4em;
  text-align: center;
  margin-top: auto;
}
.logo {
  width: 30%;
  margin: 4em auto;
}
.foto {
  height: 1000px;
  object-fit: cover;
}
h1 {
  color: $verde;
  font-family: "Barlow-SemiBold";
  text-align: center;
  font-size: 6em;
  margin: 0;
}

.nombre {
  color: $verde;
  font-size: 4em;
  font-family: Barlow-SemiBold;
}

.ciudad,
.sector {
  color: white;
  font-size: 3em;
  font-family: Barlow-ExtraLight;
}

.descripcion {
  color: white;
  padding: 0 2em;
  font-size: 2.5em;
  text-align: center;
  font-family: Barlow-SemiBold;
  overflow: hidden;
  height: 700px;
}
.mesa {
  border: 2px solid $verde;
  height: 400px;
  width: 400px;
  color: $verde;
  font-size: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

* {
  font-family: Barlow-SemiBold;
}
</style>
