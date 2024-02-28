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
    <h1 :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      Datos en tiempo real
    </h1>
    <div class="content">
      <div
        class="content-izquierda"
        :class="{ 'animate__animated animate__slideInUp': isAnimated }"
      >
        <div
          class="info-izquierda"
          :class="{ 'animate__animated animate__slideInUp': isAnimated }"
        >
          <div class="numero">{{ tiempoReal.companies }}</div>
          <div class="texto">Andalusian<br />Companies</div>
        </div>
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
      <div
        class="content-derecha"
        :class="{ 'animate__animated animate__slideInUp': isAnimated }"
      >
        <div class="info-derecha">
          <div class="numero">{{ tiempoReal.visitantes }}</div>
          <div class="texto">Visitors</div>
        </div>
        <div
          class="info-derecha"
          :class="{ 'animate__animated animate__slideInUp': isAnimated }"
        >
          <div class="numero">{{ tiempoReal.edad }}</div>
          <div class="texto">Average age</div>
        </div>
        <div
          class="info-derecha"
          :class="{ 'animate__animated animate__slideInUp': isAnimated }"
        >
          <div class="numero">{{ tiempoReal.hombres }}</div>
          <div class="texto">Men</div>
        </div>
        <div
          class="info-derecha"
          :class="{ 'animate__animated animate__slideInUp': isAnimated }"
        >
          <div class="numero">{{ tiempoReal.mujeres }}</div>
          <div class="texto">Women</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$verde: #4db88c;

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
  color: white;
  font-family: "Barlow-ExtraLightItalic", sans-serif;
  width: 50%;
  margin: auto;
  margin-top: 1em;
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

.content-derecha {
  margin: 5em;
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
    animation: rotateBackground 60s linear infinite;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .numero {
    font-size: 8em;
  }

  .texto {
    font-size: 1.5em;
    font-family: Barlow-SemiBold;
    line-height: 1em;
    margin-top: -1em;
    text-transform: uppercase;
  }
}

.info-derecha {
  .numero {
    font-size: 6em;
  }

  .texto {
    font-size: 2em;
    margin-top: -0.5em;
    text-transform: uppercase;
    font-family: Barlow-SemiBold;
  }
}
</style>
