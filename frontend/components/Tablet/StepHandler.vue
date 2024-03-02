<script setup>
import { ref, watch, onBeforeMount, onMounted, onBeforeUnmount } from "vue";

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
// const nfcContent = ref("");
const nfcStatus = ref("");
// const nfcLog = ref("");
const nfcLog0 = ref("");
const nfcLog2 = ref("");
const nfcLog3 = ref("");

const nfcSimulate = ref(false);
const nfcSerialNumberExhibitor = ref("");
const nfcSerialNumberProfessional = ref("");
const nfcSerialNumberTest1 = ref("3e:56:38:3c");
const nfcSerialNumberTest2 = ref("8e:38:40:3c");
// const remaingTimeText = ref("25:00");

const dataExhibitor = ref({});
const dataProfessional = ref({});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}

const startMeeting = () => {
  if (name.value === "") {
    alert("Please enter your name");
    return;
  }
  if (companyName.value === "") {
    alert("Please enter your company name");
    return;
  }
  if (email.value === "") {
    alert("Please enter your email");
    return;
  }
  if (companyType.value === "default") {
    alert("Please select a company type");
    return;
  }
  if (!disclaimerAcceptance.value) {
    alert("Please accept the disclaimer");
    return;
  }
  emitChangeStep(5);
};

/////////////////////////////////
/////////////////////////////////
// Cálculo del Tiempo restante
// Cuenta regresiva de 30 minutos
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
/////////////////////////////////
/////////////////////////////////
// FIN DE
// Cálculo del Tiempo restante
/////////////////////////////////
/////////////////////////////////

let interval;

onMounted(() => {
  if (process.client) {
    setupCountdown(); // Establecer el tiempo inicial restante
    interval = setInterval(updateRemainingTime, 1000); // Comenzar la cuenta regresiva
  }
});

/////////////////////////////////
// Comienzo tratamiento de NFC
/////////////////////////////////
/////////////////////////////////
if (process.client) {
  if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)){
    if (89 > parseInt(RegExp.$1)) {
      nfcStatus.value = 'Warning! Keep in mind this sample has been tested with Chrome ' + 89 + '.';
    }
  }
}

const scanNFCStep1Click = async () => {
// scanButton.addEventListener("click", async () => {
  nfcLog0.value = "User Clicked Button";
  if(nfcSimulate.value) {
    nfcSerialNumberExhibitor.value = nfcSerialNumberTest1.value;
  }
  else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcLog2.value = "> Scan started";
    } catch (error) {
      nfcLog3.value = "Argh! " + error
    }
  }
}
const scanNFCStep2Click = async () => {
  console.log("SCAN NFC STEP 2 CLICKED");
// scanButton.addEventListener("click", async () => {
  nfcLog0.value = "User Clicked Button";
  if(nfcSimulate.value) {
    nfcSerialNumberProfessional.value = nfcSerialNumberTest2.value;
  }
  else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcLog2.value = "> Scan started";
    } catch (error) {
      nfcLog3.value = "Argh! " + error
    }
  }
}

watch(nfcSerialNumberExhibitor, (newVal, oldVal) => {
  console.log("CHANGE DETECTED 1");
  nfcLog2.value = ("NewVal: " +  newVal);
  if (newVal !== "") {
    nfcSerialNumberExhibitor.value = newVal.replace(/:/g, "");
    // nfcLog2.value = `> Serial Number: ${nfcSerialNumberExhibitor.value}`;
    // emitChangeStep(2);
  }
});

watch(nfcSerialNumberProfessional, (newVal, oldVal) => {
  console.log("CHANGE DETECTED 2");
  if (newVal !== "") {
    nfcSerialNumberProfessional.value = newVal.replace(/:/g, "");
    nfcLog2.value = `> Serial Number: ${nfcSerialNumberProfessional.value}`;
    // emitChangeStep(3);
  }
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

const resetTablet = () => {
  emitChangeStep(1);
  companyType.value = '';
  name.value = '';
  companyName.value = '';
  disclaimerAcceptance.value = '';
  email.value = '';
  nfcSerialNumberExhibitor.value = '';
  nfcSerialNumberProfessional.value = '';
};


</script>

<template>
  <!-- <button @click="scanNFCclicked"> Scan</button> -->
  <!-- <h3>Live Output</h3> -->
    <div id="output" class="output">
      <!-- <div id="content">{{ nfcContent }}</div> -->
      <!-- <div id="status">{{ nfcStatus }}</div> -->
      <!-- <pre id="log" style="color: #0000ff">{{ nfcLog0 }}</pre> -->
      <!-- <pre id="log">{{ nfcLog }}</pre> -->
      <!-- <pre id="log" style="color: #ff0000">{{ nfcLog3 }}</pre> -->
    </div>
  <div>
    <Tablet_ContentWrapper v-if="step === 1" :step="step">

      <div class="step1Wrapper">
      <!-- <Tablet_Header countDownCount="false" ctaGoToStep="0" ctaText="false" /> -->
        <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="2" ctaText="false" tableText="Table 23" @changeStep="emitChangeStep(2)" />
        <div class="frame">
          <div class="title">
            AVAILABLE MEETING POINT
          </div>
          <div class="scan-subtitle">
            <div class="scanIcon">
              <img src="/img/tablet/mano-tablet-blanco@2x.png" alt="">
            </div>
            <div class="text">
              <div class="subtitle">SCAN TO RESERVE</div>
              <div class="hit">(ONLY ANDALUSIAN PROFESSIONAL)</div>
              <div class="cta">
                <div class="btn" @click="scanNFCStep1Click">Press to Scan Bracelet</div>
                  <!-- <div class="btn" @click="emitChangeStep(2)">Ir a paso 2</div> -->
                  <pre id="log" style="color: #ffffff">{{ nfcLog2 }}</pre>
            </div>
            </div>
          </div>
          <div class="nfcText">
          </div>
        
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 2" :step="step">
      <div style="color: #fff;">
        nfcSerialNumberExhibitor: {{ nfcSerialNumberExhibitor }}
      </div>
      <div class="step2Wrapper">
        <!-- <Tablet_Header countDownCount="25:00" ctaGoToStep="3" ctaText="Exit Table" @changeStep="emitChangeStep(1)" /> -->
        <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="3" ctaText="false" tableText="Table 23" @changeStep="emitChangeStep(1)" />
        <div class="frame">
          <div class="title">
            MEETING STARTED
          </div>
          <div class="waiting">
            WAITING FOR THE PROFESSIONAL
          </div>
          <div class="scan-subtitle">
            <div class="scanIcon">
              <img src="/img/tablet/mano-tablet-verde@2x.png" style="cursor: pointer;" @click="scanNFCStep2Click" alt="">
            </div>
            <div class="text">
              <div class="subtitle">
                <!-- SCAN PROFESSIONAL BRACELET -->
                <div class="btnScan" @click="scanNFCStep2Click" style="color: #fff; cursor: pointer;">Press to Scan Bracelet</div>
              </div>
            </div>
            <div class="cta">
              <div class="or">Or</div>
              <div class="btn" @click="emitChangeStep(3)">Continue</div>
            </div>
            <pre id="log" style="color: #ffffff">{{ nfcLog2 }}</pre>
          </div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 3" :step="step">
      <div style="color: #fff;">
        nfcSerialNumberProfessional: {{ nfcSerialNumberProfessional }}
      </div>
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="4" ctaText="Exit Table" tableText="false" @changeStep="emitChangeStep(1)" />
      <div class="step3Wrapper">
        <div class="frame">
          <div class="form">
            <input type="text" v-model="name" name="name" id="name" placeholder="Name" class="name">
            <input type="text" v-model="companyName" name="companyName" id="companyName" placeholder="Company Name" class="companyName">
            <!-- <select v-model="companyType" name="companyType" id="companyType" class="companyType">
              <option value="default" disabled selected>Company Type</option>
              <option value="Company Type 1">Company Type 1</option>
              <option value="Company Type 2">Company Type 2</option>
            </select> -->
            <!-- <select class="form-select rounded-0 bg-dark" id="company_type_id" autocomplete="off" wire:model.defer="company_type_id" required="" style="--bs-bg-opacity: .5;"> -->
              <select v-model="companyType" name="companyType" id="companyType" class="companyType">
                <option value="default" disabled selected>Choose an option</option>
                <option value="1">Complementary offer</option>
                <option value="2">Experiences</option>
                <option value="3">Incentives / DMC</option>
                <option value="4">Promotion entity</option>
                <option value="5">Tourist accomodation</option>
                <option value="6">Travel agency / Tour operator</option>
                <option value="7">Food services</option>
                <option value="8">Catering</option>
                <option value="9">Travel agency / Tour operator</option>
                <option value="10">Events</option>
                <option value="11">Transportation</option>
                <option value="12">Others</option>
            </select>
            <input type="text" v-model="email" name="email" id="email" placeholder="Email" class="email">
            <div class="disclaimerAcceptance">
              <input v-model="disclaimerAcceptance" type="checkbox" id="disclaimer" class="checkbox">
              <label for="disclaimer" class="label"></label>
              <div class="realLabel" @click="emitChangeStep(4)">Disclaimer Acceptance</div>
              <div class="btn" @click="startMeeting()">Start Meeting</div>
            </div>
          </div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 4" :step="step">
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="5" ctaText="false" @changeStep="emitChangeStep(1)" />
      
      <div class="step4Wrapper">
        <div class="frame">
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
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 5" :step="step">
      <Tablet_Header :countDownCount="remaingTimeText" ctaGoToStep="1" ctaText="false" tableText="false" @changeStep="emitChangeStep(1)" />
      <div class="step5Wrapper">
        <div class="frame">
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
    padding: 80px 30px 30px 30px;
    color: #fff;
    font-family: 'Barlow-Black';
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }
  }
  .frame {
    background-color: $verde;
    margin: 0 80px 80px 80px;
    min-height: 1060px;
    @media (min-width: 801px) {
      min-height: 540px;
    }
  }
  .scan-subtitle {
    padding: 30px 0;
    // margin: 80px 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    .scanIcon {
      text-align: center;
      width: 100%;
      margin: 0 0 40px 0;
      img {
        width: 200px;
      }
      @media (min-width: 801px) {
        width: auto;
        margin: 0 40px 0 0;
        img {
          width: 200px;
        }
      }
    }
    .text {
      font-family: 'Barlow-ExtraLightItalic', sans-serif;
      color: #fff;
      text-transform: uppercase;
      margin-bottom: 60px;
      text-align: left;
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
    // position: relative;
    // display: flex;
    // justify-content: center;
    // width: 30%;
    // margin: 0 auto;
    // margin-top: 80px;
    .btn {
      font-family: 'Barlow-SemiBoldItalic', sans-serif;
      // position: absolute;
      // bottom: 20px;
      // right: 150px;
      background-color: #fff;
      color: $verde;
      scale: .7;
    }
  }
}
  
.step2Wrapper {

  .frame {
    background-color: #000;
    border: 2px solid $verde;
    margin: 0 80px 80px 80px;
    min-height: 1060px;
    @media (min-width: 801px) {
      min-height: 540px;
    }
  }
  .title {
    font-size: 80px;
    text-align: center;
    margin: 80px 30px 0px 30px;
    color: #fff;
    font-family: 'Barlow-Black';
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }
  }
  .waiting {
    font-size: 50px;
    text-align: center;
    color: $verde;
    font-family: 'Barlow-Light';
    line-height: 55px;
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
      color: $verde;
      text-transform: uppercase;
      .subtitle {
        font-size: 40px;
        line-height: 45px;
        text-align: center;
        margin:0 0 5px;
      }
      @media (min-width: 801px) {
        width: 30%;
        .subtitle {
          font-size: 40px;
          text-align: left;
        }
      }
    }
  
  }

  .btnScan {
    @media (min-width: 801px) {
      margin-right: 40px;
    }
  }
  .cta {
    text-align: center;
    color: #000;
    display: flex;
    flex-direction: column;
    // margin: 0 auto;
    justify-content: center;
    align-items: center;
    font-family: 'Barlow-ExtraLightItalic', sans-serif;
    // font-size: 70px;
    color: #fff;
    .btn {
      // width: 70%;
    }
    .or {
        font-size: 30px;
        color: $verde;
        text-transform: uppercase;
        margin: 40px 0;
      }
    @media (min-width: 801px) {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .companyType {
        margin-bottom: 0;
        width: 47%;
      }
      .or {
        margin-right: 30px;
      }
      .btn {
        // width: 47%;
      }
    }
  }
}

.step3Wrapper {
  .frame {
    background-color: #000;
    border: 2px solid $verde;
    margin: 0 80px 80px 80px;
    min-height: 1060px;
    @media (min-width: 801px) {
      min-height: 540px;
    }
  }

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
      border: 3px solid $verde;
      background-color: #000;
      color: $verde;
      &::placeholder {
        color: $verde;
      } 
    }
    .companyType {
      border: 3px solid $verde;
      background-color: #000;
      color: $verde;
      text-align: center;
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
      flex-wrap: wrap;
      // width: 80%;
      margin-bottom: 30px;
      color: #fff;
      padding: 80px;
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
      width: 80%;
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
        width: 100%;
        padding: 0;
      }
      .realLabel {
        width: 46%;
      }
    }
  }
  .btn {
    width: 100%;
    margin-top: 30px;
  }
  @media (min-width: 801px) {
    .btn {
      width: 422px;
      margin-top: 0 ;
    }
  }
}

.step4Wrapper {
  .frame {
    background-color: #000;
    border: 2px solid $verde;
    margin: 0 80px 80px 80px;
    min-height: 1060px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 40px;
    width: 90%;
    color: #fff;
    padding: 40px;
    @media (min-width: 801px) {
      min-height: 300px;
    }
  }
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
      height: 200px;
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

  .frame {
    background-color: $rojo;
    margin: 0 80px 80px 80px;
    min-height: 1060px;
    @media (min-width: 801px) {
      min-height: 540px;
    }
  }
  .title {
    font-size: 80px;
    text-align: center;
    // margin: 80px 30px 30px 30px;
    padding-top: 40px;
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
