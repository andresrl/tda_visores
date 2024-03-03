<script setup>
const props = defineProps({
  currentSlideIndex: Number,
  index: Number,
  tiempoReal: Object,
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
    <header :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      <img src="/img/logo.png" alt="" />
    </header>
    <h1 :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      NETWORKING DATA
    </h1>
    <h2 :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      ITB 2024 REAL TIME DATA
    </h2>
    <div class="content">
      <div
        class="content-izquierda"
        :class="{ 'animate__animated animate__slideInUp': isAnimated }"
      >
        <div
          class="info-arriba"
          :class="{ 'animate__animated animate__slideInUp': isAnimated }"
        >
          <div class="numero" style="">{{ tiempoReal.companies }}</div>
          <div class="texto">Andalusian<br />Companies</div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div
            class="info-izquierda"
            :class="{ 'animate__animated animate__slideInUp': isAnimated }"
          >
            <div class="numero">{{ tiempoReal.professionals }}</div>
            <div class="texto">Professionals</div>
          </div>
          <div
            class="info-izquierda"
            :class="{ 'animate__animated animate__slideInUp': isAnimated }"
          >
            <div class="numero">{{ tiempoReal.meetings }}</div>
            <div class="texto">Meetings</div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <img src="/img/footer.png" alt="Footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$verde: #4db88c;
$verde-claro: #04c783;

* {
  font-family: Barlow-SemiBold;
}

header {
  text-align: center;
  width: 40%;
  margin: 3em auto 0 auto;
}

footer {
  background: $verde-claro;
  padding: 4em;
  text-align: center;
}

@keyframes rotateBackground {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

* {
  color: $verde;
  font-family: Barlow-Black;
}

.wrapper {
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  text-align: center;
  font-size: 6em;
  color: $verde;
  font-family: "Barlow-ExtraLightItalic", sans-serif;
  margin: 1em auto 0 auto;
}

h2 {
  text-align: center;
  color: white;
  font-size: 2.5em;
  font-family: "Barlow-ExtraLightItalic", sans-serif;
  margin: 0;
}

.content {
  display: flex;
  flex-grow: 1;
  text-align: center;
  margin: auto;
  gap: 6em;
}

.content-izquierda,
.content-derecha {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.info-izquierda {
  padding: 5em;
  position: relative;

  &::before {
    content: " ";
    position: absolute;
    background: url("/img/circulo.png") no-repeat;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    animation: rotateBackground 10s linear infinite;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .numero {
    font-size: 8em;
    color: white;
  }

  .texto {
    font-size: 1.5em;
    font-family: Barlow-SemiBold;
    line-height: 1em;
    margin-top: -1em;
    text-transform: uppercase;
  }
}

.info-arriba {
  padding: 10em;
  position: relative;

  &::before {
    content: " ";
    position: absolute;
    background: url("/img/circulo.png") no-repeat;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    animation: rotateBackground 15s linear infinite;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .numero {
    font-size: 16em;
    color: white;
  }

  .texto {
    font-size: 1.5em;
    font-family: Barlow-SemiBold;
    line-height: 1em;
    margin-top: -1em;
    text-transform: uppercase;
  }
}
</style>
