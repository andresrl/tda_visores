<script setup>
import { ref, watch, computed, onBeforeMount, onMounted, onBeforeUnmount } from "vue";

const runtimeConfig = useRuntimeConfig();

const BEARER_TOKEN = "Bearer 5|ne4srosIMQWM3lTyAZfIH28RONnIvinPDOhu7qdWb65ac5d3";
const API_ENDPOINT = "https://andalusiancrushlink.com/api";

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  tableName: {
    type: Number,
    required: true,
  },
});

const tableText = computed(() => {
  // console.log("props.tableName 1", dataMeetingSpaces.value);
  // console.log("props.tableName 2", props.tableName);
  if(props.tableName) {
    let table = dataMeetingSpaces.value
      .find((item) => item.table_name ===  props.tableName.toUpperCase());

    // console.log("props.tableName props.tableName.toLowerCase", props.tableName.toUpperCase());
    // console.log("props.tableName 3", table);

    // Verificar si encontramos una coincidencia
    if (table) {
      // Acceder a la propiedad 'table_name'
      fetchExhibitorbyId(table.user_id);

      isHot.value = (table.name === "H") ? true : false;

      return `Table ${table.table_name}`;
    } else {
      // Manejar el caso cuando no encontramos una coincidencia
      return "";
      // return "Table not found";
    }
  }
  else {
    return "Table 23";
  }
});


const ExhibitorTradeName = ref("");
const ExhibitorLogoUrl = ref("");

const professionalCompanyType = ref("default");
const professionalName = ref("");
const professionalCompanyName = ref("");
const professionalEmail = ref("");
const disclaimerAcceptance = ref("");
const nfcContent = ref("");
const nfcStatus = ref("");
const nfcLog = ref("");
const nfcLog0 = ref("");
const nfcLog2 = ref("");
const nfcLog3 = ref("");

const nfcSimulate = ref(true);
const nfcSerialNumberExhibitor = ref("");
const nfcSerialNumberProfessional = ref("");
// const nfcSerialNumberDecimalExhibitor = ref("3034");
// const nfcSerialNumberDecimalProfessional = ref("3034");
const nfcSerialNumberExhibitorTest = ref("3e:56:38:3c");
const nfcSerialNumberProfessionalTest = ref("8e:38:40:3c");
// const remaingTimeText = ref("25:00");

const dataMeetingSpaces = ref([]);
const dataExhibitor = ref({});
const dataProfessional = ref({});

const isHot = ref(false);

let interval = null;

const fetchMeetingSpaces = async () => {
  const { data } = await $fetch(`${API_ENDPOINT}/meeting-spaces`, {
    headers: {
      Authorization: BEARER_TOKEN,
    },
  });
  dataMeetingSpaces.value = data;
  console.log(data);
};

const fetchExhibitorbyId = async (id) => {
  console.log("tableName changed ... ...  ");
  const { data } = await $fetch(
    `${API_ENDPOINT}/company/${id}`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );
  dataExhibitor.value = data;
  console.log("tableName changed DATA", dataExhibitor.value);
};

const fetchExhibitor = async () => {
  // https://andalusiancrushlink.com/api/bracelet/3034/true
  const { data } = await $fetch(
    `${API_ENDPOINT}/bracelet/${nfcSerialNumberExhibitor.value}`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );
  dataExhibitor.value = data.user;
  ExhibitorTradeName.value = dataExhibitor.value.company_trade_name;
  ExhibitorLogoUrl.value = dataExhibitor.value.full_url_logo;
};

const fetchProfessional = async () => {
  // https://andalusiancrushlink.com/api/bracelet/3034/true
  const { data } = await $fetch(
    `${API_ENDPOINT}/bracelet/${nfcSerialNumberProfessional.value}`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );

  dataExhibitor.value = data;

  professionalName.value = "NOMBREEEEE";
  professionalName.value = dataExhibitor.value.user.name;
  // console.log("NAMEEEE", professionalName.value);
  professionalEmail.value = dataExhibitor.value.user.email;
  professionalCompanyName.value = dataExhibitor.value.user.company_name;

  // console.log(dataExhibitor);
};

const postMeetingSlotBlock = async () => {
  const { data } = await $fetch(
    `${API_ENDPOINT}/meeting-slot-block?user_id=${dataExhibitor.value.id}&slot_id=513`,
    // `${API_ENDPOINT}/meeting-slot-block?user_bracelet=${nfcSerialNumberExhibitor.value}&table_name=${props.tableName}`,
    {
      method: "POST",
      headers: {
        Authorization: BEARER_TOKEN,
      },
    });
    console.log(data);
};

const postMeetingData = async () => {
  const body = {
    company_name: dataExhibitor.value.user.company_name,
    company_tradename: dataExhibitor.value.user.company_trade_name,
    company_username:
      dataExhibitor.value.user.name + " - " + dataExhibitor.value.user.surname,
    company_email: dataExhibitor.value.user.email,
    professional_fullname: professionalName.value,
    professional_company: professionalCompanyName.value,
    professional_email: professionalEmail.value,
    professional_sector: professionalCompanyType.value,
  };

  // const { data } = await $fetch(`${runtimeConfig.public.NODE_SERVER_URL}/api/save-meeting-json`, {
  const { data } = await $fetch(`${runtimeConfig.public.BACKEND_SERVER_URL}/`, {
    method: "POST",
    body: JSON.stringify(body),
  });


  // const params = new URLSearchParams({
  //   company_name: body.company_name,
  //   company_tradename: body.company_tradename,
  //   company_username: body.company_username,
  //   company_email: body.company_email,
  //   professional_fullname: body.professional_fullname,
  //   professional_company: body.professional_company,
  //   professional_email: body.professional_email,
  //   professional_sector: body.professional_sector
  // }).toString();

  // const { data } = await $fetch(`${runtimeConfig.public.BACKEND_SERVER_URL}/?${params}`, {
  //   method: "GET"
  // });

  alert("DATA: " + data);
  console.log(data);
};

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}

const startMeeting = () => {
  if (professionalName.value === "") {
    alert("Please enter your name");
    return;
  }
  if (professionalCompanyName.value === "") {
    alert("Please enter your company name");
    return;
  }
  if (professionalEmail.value === "") {
    alert("Please enter your email");
    return;
  }
  if (professionalCompanyType.value === "default") {
    alert("Please select a company type");
    return;
  }
  if (!disclaimerAcceptance.value) {
    alert("Please accept the disclaimer");
    return;
  }
  postMeetingSlotBlock();
  postMeetingData();
  emitChangeStep(5);
};

/////////////////////////////////
/////////////////////////////////
// Cálculo del Tiempo restante
// Cuenta regresiva de 30 minutos
/////////////////////////////////
/////////////////////////////////

const remaingTimeText = ref("");

// Función para calcular el tiempo restante hasta el próximo bloque de 30 minutos
const calculateNextBlock = () => {
  const now = new Date();
  // Redondear hacia arriba al próximo intervalo de 30 minutos
  const nextBlockMinutes = Math.ceil(now.getMinutes() / 30) * 30;
  const nextBlock = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    nextBlockMinutes,
    0
  );

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
  remaingTimeText.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Función para actualizar el texto de tiempo restante
const updateRemainingTime = () => {
  const parts = remaingTimeText.value.split(":");
  let minutes = parseInt(parts[0], 10);
  let seconds = parseInt(parts[1], 10);

  if (seconds === 0) {
    if (minutes === 0) {
      // Reiniciar la cuenta regresiva cuando llegue a 0
      // setupCountdown();
      // resetTablet();
      location.reload();
      return;
    } else {
      minutes--;
    }
    seconds = 59;
  } else {
    seconds--;
  }

  remaingTimeText.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
/////////////////////////////////
/////////////////////////////////
// FIN DE
// Cálculo del Tiempo restante
/////////////////////////////////
/////////////////////////////////

onMounted(() => {
  var interval;
  if (process.client) {
    setupCountdown(); // Establecer el tiempo inicial restante
    interval = setInterval(updateRemainingTime, 1000); // Comenzar la cuenta regresiva
  }

  if(props.tableName !== "") {
    console.log("tableName changed");
    fetchMeetingSpaces();
  }
});


/////////////////////////////////
// Comienzo tratamiento de NFC
/////////////////////////////////
/////////////////////////////////
if (process.client) {
  if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)) {
    if (89 > parseInt(RegExp.$1)) {
      nfcStatus.value =
        "Warning! Keep in mind this sample has been tested with Chrome " + 89 + ".";
    }
  }
}

const scanNFCStep1Click = async () => {
  // scanButton.addEventListener("click", async () => {
  nfcLog0.value = "User Clicked Button";
  if (nfcSimulate.value) {
    nfcSerialNumberExhibitor.value = nfcSerialNumberExhibitorTest.value;
    nfcLog2.value = "> Scanning...";
  } else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcLog2.value = "> Scanning...";
      ndef.addEventListener("readingerror", () => {
        nfcLog2.value = "Argh! Cannot read data from the NFC tag. Try another one?";
      });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        // nfcLog2.value = `> Serial Number: ${serialNumber}`
        nfcSerialNumberExhibitor.value = serialNumber;
      });
    } catch (error) {
      nfcLog3.value = "Argh! " + error;
    }
  }
};
const scanNFCStep2Click = async () => {
  console.log("SCAN NFC STEP 2 CLICKED");
  // scanButton.addEventListener("click", async () => {
  nfcLog0.value = "User Clicked Button";
  if (nfcSimulate.value) {
    nfcSerialNumberProfessional.value = nfcSerialNumberProfessionalTest.value;
    nfcLog3.value = "> Scanning...";
  } else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcLog3.value = "> Scanning...";
      ndef.addEventListener("readingerror", () => {
        nfcLog2.value = "Argh! Cannot read data from the NFC tag. Try another one?";
      });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        // nfcLog2.value = `> Serial Number: ${serialNumber}`
        nfcSerialNumberProfessional.value = serialNumber;
      });
    } catch (error) {
      nfcLog3.value = "Argh! " + error;
    }
  }
};

watch(nfcSerialNumberExhibitor, (newVal, oldVal) => {
  if (newVal !== "") {
    nfcSerialNumberExhibitor.value = newVal.replace(/:/g, "");
    fetchExhibitor();
    emitChangeStep(2);
    // nfcLog2.value = `> Serial Number: ${nfcSerialNumberExhibitor.value}`;
  }
});

watch(nfcSerialNumberProfessional, (newVal, oldVal) => {
  console.log("nfcSerialNumberProfessional changed");
  if (newVal !== "") {
    nfcSerialNumberProfessional.value = newVal.replace(/:/g, "");
    fetchProfessional();
    emitChangeStep(3);
    // nfcLog2.value = `> Serial Number: ${nfcSerialNumberProfessional.value}`;
  }
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

const resetTablet = () => {
  emitChangeStep(1);
  companyType.value = "";
  name.value = "";
  companyName.value = "";
  disclaimerAcceptance.value = "";
  email.value = "";
  nfcSerialNumberExhibitor.value = "";
  nfcSerialNumberProfessional.value = "";
  nfcLog.value = "";
  nfcLog0.value = "";
  nfcLog2.value = "";
  nfcLog3.value = "";
  dataExhibitor.value = {};
  dataProfessional.value = {};
};
</script>

<template>
  <!-- <button @click="scanNFCclicked"> Scan</button> -->
  <!-- <h3>Live Output</h3> -->
  <div id="output" v-if="false" class="output">
    <div id="content">{{ nfcContent }}</div>
    <div id="status">{{ nfcStatus }}</div>
    <pre id="log" style="color: #0000ff">{{ nfcLog0 }}</pre>
    <pre id="log" style="color: #00ff00">{{ nfcLog }}</pre>
    <pre id="log" style="color: #ff0000">{{ nfcLog3 }}</pre>
  </div>
  <div>
    <Tablet_ContentWrapper v-if="step === 1" :step="step">
      <div class="step1Wrapper">
        <!-- <Tablet_Header countDownCount="false" ctaGoToStep="0" ctaText="false" /> -->
        <Tablet_Header
          :countDownCount="remaingTimeText"
          ctaGoToStep="2"
          ctaText="false"
          :tableText="tableText"
          @changeStep="emitChangeStep(2)"
        />
        <div class="frame">
          <div class="title" v-if="isHot">AVAILABLE MEETING POINT</div>
          <div class="title company" v-else>
            <div class="text" v-if="dataExhibitor.company_trade_name">
              <div>{{ dataExhibitor.company_trade_name }}</div>
              <div class="available">AVAILABLE MEETING POINT</div>
            </div>
            <div class="logo" v-if="dataExhibitor.full_url_logo">
              <img :src="dataExhibitor.full_url_logo" alt="" />  
            </div>
          </div>
          <div class="scan-subtitle">
            <div class="scanIcon">
              <img src="/img/tablet/mano-tablet-blanco@2x.png" alt="" />
            </div>
            <div class="text">
              <div class="subtitle">SCAN TO RESERVE</div>
              <div class="hit">(ONLY ANDALUSIAN PROFESSIONAL)</div>
              <div class="cta">
                <div class="btn" @click="scanNFCStep1Click">Press to Scan Bracelet</div>
                <!-- <div class="btn" @click="emitChangeStep(2)">Ir a paso 2</div> -->
                <div id="log" style="color: #ffffff">{{ nfcLog2 }}</div>
              </div>
            </div>
          </div>
          <div class="nfcText"></div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 2" :step="step">
      <!-- <div style="color: #fff;">
        nfcSerialNumberExhibitor: {{ nfcSerialNumberExhibitor }}<br>
      dataExhibitor.company_trade_name: {{ dataExhibitor.company_trade_name }}
      </div> -->
      <div class="step2Wrapper">
        <!-- <Tablet_Header countDownCount="25:00" ctaGoToStep="3" ctaText="Exit Table" @changeStep="emitChangeStep(1)" /> -->
        <Tablet_Header
          :countDownCount="remaingTimeText"
          ctaGoToStep="3"
          ctaText="false"
          :tableText="tableText"
          @changeStep="emitChangeStep(1)"
        />
        <div class="frame">
          <div class="title">MEETING STARTED</div>
          <div class="waiting">WAITING FOR THE PROFESSIONAL</div>
          <div class="scan-subtitle">
            <div class="scanIcon">
              <img
                src="/img/tablet/mano-tablet-verde@2x.png"
                style="cursor: pointer"
                @click="scanNFCStep2Click"
                alt=""
              />
            </div>
            <div class="text">
              <div class="subtitle">
                <!-- SCAN PROFESSIONAL BRACELET -->
                <div
                  class="btnScan"
                  @click="scanNFCStep2Click"
                  style="color: #fff; cursor: pointer">

                  Press to Scan Bracelet
                </div>
              </div>
              <div id="log" style="color: #ffffff; text-align: left">{{ nfcLog3 }}</div>
            </div>
            <div class="cta">
              <div class="or">Or</div>
              <div class="btn" @click="emitChangeStep(3)">Continue</div>
            </div>
          </div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 3" :step="step">
      <!-- <div style="color: #fff;">
        nfcSerialNumberProfessional: {{ nfcSerialNumberProfessional }}
      </div> -->
      <!-- <div style="color: #fff;">
        nfcSerialNumberExhibitor: {{ nfcSerialNumberExhibitor }}<br>
        dataExhibitor.company_trade_name: {{ dataExhibitor.company_trade_name }}
      </div> -->
      <Tablet_Header
        :countDownCount="remaingTimeText"
        ctaGoToStep="4"
        ctaText="Exit Table"
        tableText="false"
        @changeStep="emitChangeStep(1)"
      />
      <div class="step3Wrapper">
        <div class="frame">
          <div class="form">
            <input
              type="text"
              v-model="professionalName"
              name="name"
              id="name"
              placeholder="Name"
              class="name"
            />
            <input
              type="text"
              v-model="professionalCompanyName"
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              class="companyName"
            />
            <select
              v-model="professionalCompanyType"
              name="companyType"
              id="companyType"
              class="companyType"
            >
              <option value="default" disabled selected>Company Type</option>
              <option value="Complementary offer">Complementary offer</option>
              <option value="Experiences">Experiences</option>
              <option value="Incentives / DMC">Incentives / DMC</option>
              <option value="Promotion entity">Promotion entity</option>
              <option value="Tourist accomodation">Tourist accomodation</option>
              <option value="Travel agency / Tour operator">
                Travel agency / Tour operator
              </option>
              <option value="Food services">Food services</option>
              <option value="Catering">Catering</option>
              <option value="Travel agency / Tour operator">
                Travel agency / Tour operator
              </option>
              <option value="Events">Events</option>
              <option value="Transportation">Transportation</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="text"
              v-model="professionalEmail"
              name="email"
              id="email"
              placeholder="Email"
              class="email"
            />
            <div class="disclaimerAcceptance">
              <input
                v-model="disclaimerAcceptance"
                type="checkbox"
                id="disclaimer"
                class="checkbox"
              />
              <label for="disclaimer" class="label"></label>
              <div class="realLabel" @click="emitChangeStep(4)">
                Disclaimer Acceptance
              </div>
              <div class="btn" @click="startMeeting()">Start Meeting</div>
            </div>
          </div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 4" :step="step">
      <Tablet_Header
        :countDownCount="remaingTimeText"
        ctaGoToStep="5"
        ctaText="false"
        @changeStep="emitChangeStep(1)"
      />

      <div class="step4Wrapper">
        <div class="frame">
          <h2>Disclaimer Acceptance</h2>
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
          <div class="cta">
            <div class="btn" @click="emitChangeStep(3)">Back</div>
          </div>
        </div>
      </div>
    </Tablet_ContentWrapper>
    <Tablet_ContentWrapper v-if="step === 5" :step="step">
      <!-- <div style="color: #000;">
        nfcSerialNumberExhibitor: {{ nfcSerialNumberExhibitor }}<br>
        dataExhibitor.company_trade_name: {{ dataExhibitor.company_trade_name }}
      </div> -->
      <Tablet_Header
        :countDownCount="remaingTimeText"
        ctaGoToStep="1"
        ctaText="false"
        tableText="false"
        @changeStep="emitChangeStep(1)"
      />
      <div class="step5Wrapper">
        <div class="frame">
          <div class="title">MEETING IN COURSE</div>
          <div></div>
          <div class="companyDetails">
            <div class="logo">
              <img :src="ExhibitorLogoUrl" alt="" />
            </div>
            <div class="name">
              {{ ExhibitorTradeName }}
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

.btn,
input,
select {
  box-sizing: border-box;
}

.btn {
  cursor: pointer;
}
.btn {
  text-align: center;
  text-transform: uppercase;
  padding: 20px 40px;
  font-family: "Barlow-ExtraLightItalic", sans-serif;
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
  font-family: "Barlow-ExtraLightItalic", sans-serif;
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
    font-family: "Barlow-Black";
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }

    &.company {
      padding: 40px 30px 30px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: 45px;
      .text {
        text-align: center;
        font-size: 40px;
        .available {
          font-size: 30px;
        }
      }
      .logo {
        text-align: center;
        img {
          width: 200px;
        }
      }
      @media (min-width: 801px) {
        flex-direction: row;
        .text {
          text-align: left;
          font-size: 50px;
        }
        .logo {
        text-align: right;
        img {
          height: 100px;
          width: 100px;
          object-fit: contain;
        }
      }
      }
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
      font-family: "Barlow-ExtraLightItalic", sans-serif;
      color: #fff;
      text-transform: uppercase;
      margin-bottom: 60px;
      text-align: left;
      .subtitle {
        font-size: 55px;
        text-align: center;
        margin: 0 0 5px;
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
      font-family: "Barlow-SemiBoldItalic", sans-serif;
      // position: absolute;
      // bottom: 20px;
      // right: 150px;
      background-color: #fff;
      color: $verde;
      scale: 0.7;
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
    font-family: "Barlow-Black";
    line-height: 80px;
    @media (min-width: 801px) {
      font-size: 70px;
    }
  }
  .waiting {
    font-size: 50px;
    text-align: center;
    color: $verde;
    font-family: "Barlow-Light";
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
      font-family: "Barlow-ExtraLightItalic", sans-serif;
      color: $verde;
      text-transform: uppercase;
      .subtitle {
        font-size: 40px;
        line-height: 45px;
        text-align: center;
        margin: 0 0 5px;
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
    font-family: "Barlow-ExtraLightItalic", sans-serif;
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
      font-family: "Barlow-ExtraLightItalic", sans-serif;
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
      font-family: "Barlow-ExtraLightItalic", sans-serif;
      font-size: 33px;
      text-transform: uppercase;
      margin-bottom: 40px;
    }
    .disclaimerAcceptance {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: "Barlow-ExtraLightItalic", sans-serif;
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
      margin-top: 0;
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
    font-family: "Barlow-SemiBold", sans-serif;
    font-size: 30px;
    text-align: left;
    width: 100%;
  }
  .content {
    height: 750px;
    overflow-y: scroll;
    font-family: "Barlow-ExtraLight", sans-serif;
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
    font-family: "Barlow-Black";
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
        height: 300px;
        object-fit: contain;
      }
      @media (min-width: 801px) {
        img {
          width: 400px;
        }
      }
    }
    .name {
      font-family: "Barlow-ExtraLightItalic", sans-serif;
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
