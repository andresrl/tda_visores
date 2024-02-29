<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";

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

const companyType = ref("default");
const name = ref("");
const companyName = ref("");
const email = ref("");
const disclaimerAcceptance = ref("");
// const remaingTimeText = ref("25:00");

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}


/////////////////////////////////
/////////////////////////////////
// Cálculo del Tiempo restante
/////////////////////////////////
/////////////////////////////////
/*
const remaingTimeText = ref('');

// Función para calcular el tiempo restante hasta el próximo bloque de 30 minutos
const calculateNextBlock = () => {
  const now = new Date();
  let nextBlock;

  if (now.getMinutes() < 5) {
    // Si es menos de 30 minutos pasada la hora, el próximo bloque es a la media hora
    nextBlock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 5, 0);
  } else {
    // De lo contrario, el próximo bloque es a la hora siguiente
    nextBlock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
  }

  return nextBlock;
};

// Función para establecer el tiempo inicial y la cuenta regresiva
const setupCountdown = () => {
  const now = new Date();
  const nextBlock = calculateNextBlock();

  // Calcular la diferencia en segundos
  const diff = (nextBlock - now) / 1000;
  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor(diff % 60);
  remaingTimeText.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Función para actualizar el texto de tiempo restante
const updateRemainingTime = () => {
  const parts = remaingTimeText.value.split(':');
  let minutes = parseInt(parts[0], 10);
  let seconds = parseInt(parts[1], 10);

  if (seconds === 0) {
    if (minutes === 0) {
      // Reiniciar la cuenta regresiva cuando llegue a 0
      setupCountdown();
      resetTablet();
      return;
    } else {
      minutes--;
    }
    seconds = 59;
  } else {
    seconds--;
  }

  remaingTimeText.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

let interval;

onMounted(() => {
  if (process.client) {
    setupCountdown(); // Establecer el tiempo inicial restante
    interval = setInterval(updateRemainingTime, 1000); // Comenzar la cuenta regresiva
  }
});

onBeforeUnmount(() => {
  // Limpiar el intervalo cuando el componente se desmonte
  clearInterval(interval);
});

const resetTablet = () => {
  emitChangeStep(1);
  companyType.value = '';
  name.value = '';
  companyName.value = '';
  email.value = '';
};
*/
/////////////////////////////////
/////////////////////////////////


const remaingTimeText = ref('');

// Función para calcular el tiempo restante hasta el próximo bloque de 30 minutos
const calculateNextBlock = () => {
  const now = new Date();
  // Redondear hacia arriba al próximo intervalo de 30 minutos
  const nextBlockMinutes = Math.ceil(now.getMinutes() / 30) * 30;
  const nextBlock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), nextBlockMinutes, 0);

  // Ajustar al próximo intervalo si ya estamos en él
  if (nextBlock <= now) {
    nextBlock.setMinutes(nextBlock.getMinutes() + 30);
  }

  return nextBlock;
};

// Función para establecer el tiempo inicial y la cuenta regresiva
const setupCountdown = () => {
  const now = new Date();
  const nextBlock = calculateNextBlock();

  // Calcular la diferencia en segundos
  const diff = (nextBlock - now) / 1000;
  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor(diff % 60);
  remaingTimeText.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Función para actualizar el texto de tiempo restante
const updateRemainingTime = () => {
  const parts = remaingTimeText.value.split(':');
  let minutes = parseInt(parts[0], 10);
  let seconds = parseInt(parts[1], 10);

  if (seconds === 0) {
    if (minutes === 0) {
      // Reiniciar la cuenta regresiva cuando llegue a 0
      setupCountdown();
      resetTablet();
      return;
    } else {
      minutes--;
    }
    seconds = 59;
  } else {
    seconds--;
  }

  remaingTimeText.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

let interval;

onMounted(() => {
  if (process.client) {
    setupCountdown(); // Establecer el tiempo inicial restante
    interval = setInterval(updateRemainingTime, 1000); // Comenzar la cuenta regresiva
  }
});

onBeforeUnmount(() => {
  // Limpiar el intervalo cuando el componente se desmonte
  clearInterval(interval);
});

const resetTablet = () => {
  emitChangeStep(1);
  companyType.value = '';
  name.value = '';
  companyName.value = '';
  disclaimerAcceptance.value = '';
  email.value = '';
};


/////////////////////////////////
/////////////////////////////////v

// function handleChangeStep(newStep) {
//   step.value = newStep;
// }

</script>

<template>
  <div>
    <Tablet_ContentWrapper v-if="step === 1" :step="step">

      <div class="step1Wrapper">
      <!-- <Tablet_Header countDownCount="false" ctaGoToStep="0" ctaText="false" /> -->
        <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="2" ctaText="false" @changeStep="emitChangeStep(2)" />
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
        <div class="cta">
          <div class="btn" @click="emitChangeStep(2)">Simular escaneo</div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 2" :step="step">
      <div class="step2Wrapper">
        <!-- <Tablet_Header countDownCount="25:00" ctaGoToStep="3" ctaText="Exit Table" @changeStep="emitChangeStep(1)" /> -->
        <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="3" ctaText="false" @changeStep="emitChangeStep(1)" />
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
          <div class="or">Or</div>
          <div class="btn" @click="emitChangeStep(3)">Continue</div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 3" :step="step">
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="4" ctaText="false" @changeStep="emitChangeStep(1)" />
      <div class="step3Wrapper">
        <div class="form">
          <input type="text" v-model="name" name="name" id="name" placeholder="Name" class="name">
          <input type="text" v-model="companyName" name="companyName" id="companyName" placeholder="Company Name" class="companyName">
          <select v-model="companyType" name="companyType" id="companyType" class="companyType">
            <option value="default" disabled selected>Company Type</option>
            <option value="Company Type 1">Company Type 1</option>
            <option value="Company Type 2">Company Type 2</option>
          </select>
          <input type="text" v-model="email" name="email" id="email" placeholder="Email" class="email">
          <div class="disclaimerAcceptance">
            <input v-model="disclaimerAcceptance" type="checkbox" id="disclaimer" class="checkbox">
            <label for="disclaimer" class="label"></label>
            <div class="realLabel" @click="emitChangeStep(4)">Disclaimer Acceptance</div>
          </div>
        </div>
        <div class="cta">
          <div class="btn" @click="emitChangeStep(5)">Start Meeting</div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 4" :step="step">
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="5" ctaText="" @changeStep="emitChangeStep(1)" />
      <div class="step4Wrapper">
        <h2>Disclaimer Acceptance</h2>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div class="cta">
          <div class="btn" @click="emitChangeStep(3)">Back</div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 5" :step="step">
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="1" ctaText="Finish Meeting" @changeStep="emitChangeStep(1)" />
      <div class="step5Wrapper">
        <div class="title">
          MEETING IN COURSE
        </div>
        <div class="companyDetails">
          <div class="logo">
            <img src="https://place-hold.it/800x450" alt="">
          </div>
          <div class="name">
            Company Name XYZ
          </div>
        </div>
      </div>
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

.btn, input, select {
  box-sizing: border-box;
}

.btn {
  cursor: pointer;
}
.btn {
  text-align: center;
  text-transform: uppercase;
  padding: 20px 40px;
  font-family: 'Barlow-ExtraLightItalic', sans-serif;
  background-color: $verde;
  font-size: 33px;
  &:hover {
    background-color: darken($verde, 15%);
  }
}

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
  .cta {
    position: relative;
    display: flex;
    justify-content: center;
    // width: 30%;
    margin: 0 auto;
    margin-top: 80px;
    .btn {
      position: absolute;
      bottom: 20px;
      right: 150px;
      background-color: #fff;
      scale: .7;
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
    margin: 50px 50px;
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
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: 'Barlow-ExtraLightItalic', sans-serif;
    font-size: 70px;
    color: #fff;
    .btn {
      width: 70%;
    }
    @media (min-width: 801px) {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 70%;
      .companyType {
        margin-bottom: 0;
        width: 47%;
      }
      .or {
        margin-right: 30px;
      }
      .btn {
        width: 47%;
      }
    }
  }
}

.step3Wrapper {

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 120px;
    input {
      text-transform: uppercase;
      text-align: center;
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      padding: 20px 40px;
      width: 80%;
      margin-bottom: 40px;
    }
    .companyType {
      border: none;
      background-color: #fff;
      color: #000;
      padding: 20px 40px;
      width: 80%;
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      font-size: 33px;
      text-transform: uppercase;
      margin-bottom: 40px;
    }
    .disclaimerAcceptance {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      font-size: 33px;
      text-transform: uppercase;
      width: 80%;
      margin-bottom: 30px;
    }
    .checkbox {
      display: none; /* Oculta la casilla de verificación original */
    }

    .label {
      display: inline-block;
      width: 40px; /* Tamaño de la casilla de verificación personalizada */
      height: 40px; /* Tamaño de la casilla de verificación personalizada */
      background: #eee; /* Color de fondo de la casilla de verificación personalizada */
      margin-right: 20px;
      cursor: pointer;
      position: relative;
    }

    .realLabel {
      cursor: pointer;
      text-decoration: underline;
    }

    .label::after {
      content: "";
      position: absolute;
      top: 10px;
      left: 10px;
      width: 20px;
      height: 20px;
      background: #00ce7e; /* Color de la marca de verificación */
      transform: scale(0); /* Inicia sin ser visible */
      transition: transform 0.2s ease;
    }

    .checkbox:checked + .label::after {
      transform: scale(1); /* Muestra la marca de verificación cuando esté seleccionado */
    }
    @media (min-width: 801px) {

      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
      margin-top: 80px;
      input {
        width: 47%;
      }
      .companyType {
        width: 47%;
      }
      .disclaimerAcceptance {
        width: 47%;
      }
    }
  }
  .cta {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 80%;
    }
    @media (min-width: 801px) {
      .btn {
        width: 47%;
      }
    }
  }
}

.step4Wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 40px;
  width: 90%;
  color: #fff;
  h2 {
    font-family: 'Barlow-SemiBold', sans-serif;
    font-size: 30px;
    text-align: left;
    width: 100%;
  }
  .content {
    height: 750px;
    overflow-y: scroll;
    font-family: 'Barlow-ExtraLight', sans-serif;
    @media (min-width: 801px) {
      height: 297px;
    }
  }
  .cta {
    display: flex;
    justify-content: center;
    width: 30%;
    margin-top: 40px;
    .btn {
      width: 100%;
    }
  }
}

.step5Wrapper {
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
  .companyDetails {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
    .logo {
      line-height: 0;
      img {
        width: 400px;
      }
      @media (min-width: 801px) {
        img {
          width: 400px;
        }
      }
    }
    .name {
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      font-size: 50px;
      text-transform: uppercase;
      margin-top: 40px;
      color: #fff;
    }
    @media (min-width: 801px) {
      flex-direction: row;
      .name {
        margin-top: 0;
        margin-left: 40px;
      }
    }
  }
}

</style>
