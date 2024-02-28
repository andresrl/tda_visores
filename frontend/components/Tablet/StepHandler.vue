<script setup>
import { ref, onBeforeMount, onMounted } from "vue";

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}

// function handleChangeStep(newStep) {
//   step.value = newStep;
// }

</script>

<template>
  <div>
    <Tablet_ContentWrapper v-if="step === 1" :step="step">

      <div class="step1Wrapper">
      <!-- <Tablet_Header countDownCount="false" ctaGoToStep="0" ctaText="false" /> -->
        <Tablet_Header countDownCount="false" ctaGoToStep="2" ctaText="false" @changeStep="emitChangeStep(2)" />
        <div class="title">
          AVAILABLE MEETING POINT
        </div>
        <div class="scan-subtitle">
          <div class="scanIcon">
            <img src="/img/tablet/hand-tablet-icon-vertical@2x.png" alt="">
          </div>
          <div class="text">
            <div class="subtitle">SCAN TO RESERVE</div>
            <div class="hit">(ONLY ANDALUSIAN PROFESSIONAL)</div>
          </div>
        </div>
        <button @click="emitChangeStep(2)">Ir al Paso 2</button>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 2" :step="step">
      <div class="step2Wrapper">
        <Tablet_Header countDownCount="25:00" ctaGoToStep="3" ctaText="Exit Table" @changeStep="emitChangeStep(1)" />
        <div class="title">
          WAITING FOR THE PROFESSIONAL
        </div>
        <div class="scan-subtitle">
          <div class="scanIcon">
            <img src="/img/tablet/hand-tablet-icon-vertical@2x.png" alt="">
          </div>
          <div class="text">
            <div class="subtitle">SCAN PROFESSIONAL ID</div>
          </div>
        </div>
        <div class="cta">
          <select name="companyType" id="companyType" class="companyType">
            <option value="companyType">Company Type</option>
          </select>
          <div class="btn" @click="emitChangeStep(3)">Continue</div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 3" :step="step">
      <Tablet_Header countDownCount="25:00" ctaGoToStep="4" ctaText="Exit Table" @changeStep="emitChangeStep(1)" />
      CONTENIDO 3<br>
      <button @click="emitChangeStep(4)">Ir al Paso 4</button>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 4" :step="step">
      <Tablet_Header countDownCount="25:00" ctaGoToStep="5" ctaText="Exit Table" @changeStep="emitChangeStep(1)" />
      CONTENIDO 4<br>
      <button @click="emitChangeStep(5)">Ir al Paso 5</button>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 5" :step="step">
      <Tablet_Header countDownCount="25:00" ctaGoToStep="1" ctaText="Finish Meeting" @changeStep="emitChangeStep(1)" />
      CONTENIDO 5
    </Tablet_ContentWrapper>
    <!-- <button v-if="step !== 5" @click="emitChangeStep(step + 1)">
      Cambiar al siguiente paso
    </button>
    <button v-if="step === 5" @click="emitChangeStep(1)">Volver al Paso 1</button> -->
  </div>
</template>

<style lang="scss" scoped>
$verde: #00ce7e;
$rojo: #d41c24;
$naranja: #e2973b;

.step1Wrapper {
  .title {
    font-size: 80px;
    text-align: center;
    margin: 80px 30px 30px 30px;
    color: #fff;
    font-family: 'Barlow-Black';
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }
  }
  .scan-subtitle {
    margin: 80px 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    .scanIcon {
      text-align: center;
      width: 100%;
      margin: 0 0 40px 0;
      img {
        width: 280px;
      }
      @media (min-width: 801px) {
        width: auto;
        margin: 0 40px 0 0;
        img {
          width: 280px;
        }
      }
    }
    .text {
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      color: #fff;
      text-transform: uppercase;
      .subtitle {
        font-size: 55px;
        text-align: center;
        margin:0 0 5px;
        @media (min-width: 801px) {
          font-size: 60px;
        }
      }
      .hint {
        font-size: 28px;
        text-align: center;
        @media (min-width: 801px) {
          font-size: 35px;
        }
      }
    }
  
  }
}
  
.step2Wrapper {
  .title {
    font-size: 80px;
    text-align: center;
    margin: 80px 30px 30px 30px;
    color: #fff;
    font-family: 'Barlow-Black';
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }
  }
  .scan-subtitle {
    margin: 80px 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    .scanIcon {
      text-align: center;
      width: 100%;
      margin: 0 0 40px 0;
      img {
        width: 174px;
      }
      @media (min-width: 801px) {
        width: auto;
        margin: 0 40px 0 0;
        img {
          width: 174px;
        }
      }
    }
    .text {
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      color: #fff;
      text-transform: uppercase;
      .subtitle {
        font-size: 55px;
        text-align: center;
        margin:0 0 5px;
        @media (min-width: 801px) {
          font-size: 60px;
        }
      }
    }
  
  }

  .cta {
    text-align: center;
    color: #000;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: space-between;
    width: 70%;
    .companyType {
      border: none;
      background-color: #fff;
      color: #000;
      padding: 20px 40px;
      width: 560px;
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      font-size: 33px;
      text-transform: uppercase;
      margin-bottom: 40px;
    }
    .btn {
      text-align: center;
      text-transform: uppercase;
      width: 480px;
      padding: 20px 40px;
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      background-color: $verde;
      font-size: 33px;
      &:hover {
        background-color: darken($verde, 15%);
      }
    }
    @media (min-width: 801px) {
      flex-direction: row;
      align-items: center;
      .companyType {
        margin-bottom: 0;
        width: 380px;
      }
      .btn {
        width: 300px;
      }
    }
  }
}

</style>
