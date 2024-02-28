<script setup>

const props = defineProps({
  ctaGoToStep: {
    type: Number,
    required: true,
  },
  ctaText: {
    type: String,
    required: true,
  },
  countDownCount: {
    type: Number,
    required: true,
  },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep() {
  emit("changeStep", props.ctaGoToStep);
  console.log(props.ctaGoToStep)
}

</script>

<template>

  <header>
    <div class="w33 countdown">
      <div v-if="countDownCount!=='false'">{{props.countDownCount}}</div>
    </div>
    <div class="w33 logo">
      <img src="/img/tablet/andalusian-crush-logo@2x.png" alt="">
    </div>
    <div class="w33 cta">
      <a v-if="ctaText!=='false'" href="#" @click="emitChangeStep">{{props.ctaText}}</a>
    </div>
  </header>

</template>

<style lang="scss" scoped>
$verde: #00ce7e;
$rojo: #d41c24;
$naranja: #e2973b;

header {
  background-color: #000;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .w33 {
    min-width: 33%;
  }
  .countdown div {
    color: #fff;
    font-size: 24px;
    font-style: 'Barlow-Black';
    font-size: 65px;
    line-height: 0;
    @media (min-width: 801px) {
      font-size: 85px;
    }
  }
  .logo {
    text-align: center;
    // display: flex;
    // justify-content: center;
    img {
      width: 180px;
      @media (min-width: 801px) {
        width: 240px;
      }
    }
  }
  .cta {
    text-align: right;
    a {
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      font-size: 24px;
      text-transform: uppercase;
      background-color: $rojo;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      padding: 10px 20px;
      &:hover {
        background-color: darken($rojo, 15%);
      }
    }
    @media (min-width: 801px) {
      a {
        font-size: 30px;
      }
    }
  }
}

</style>
