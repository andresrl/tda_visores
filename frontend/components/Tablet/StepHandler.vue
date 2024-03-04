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

const ExhibitorIdfromTableNumber = ref("");
const ExhibitorIdFromNFC = ref("");
const MeetingSpaceId = ref("");

const ExhibitorTradeName = ref("");
const ExhibitorLogoUrl = ref("");

const exhibitorCompanyName = ref("")
const exhibitorTradeName = ref("")
const exhibitorName = ref("")
const exhibitorEmail = ref("")

const professionalCompanyType = ref("default");
const professionalName = ref("");
const professionalCompanyName = ref("");
const professionalEmail = ref("");
const disclaimerAcceptance = ref("");
const nfcContent = ref("");
const nfcStatus = ref("");
const nfcLog0 = ref("");
const nfcLog1 = ref("");
const nfcLog2 = ref("");
const nfcLog3 = ref("");
const scanText1 = ref('');
const scanText2 = ref('');

const nfcSimulate = ref(false);
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

      MeetingSpaceId.value = table.id;

      // alert("SPACE ID: " + MeetingSpaceId.value);

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

const fetchExhibitorfromNFC = async () => {
  // https://andalusiancrushlink.com/api/bracelet/3034/true
  const { data } = await $fetch(
    `${API_ENDPOINT}/bracelet/${nfcSerialNumberExhibitor.value}`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );

  if(data.user.user_type !== "professional-and") {
    alert("YOU ARE NOT ALLOWED TO RESERVE THIS TABLE");
    location.reload();
  }

  exhibitorCompanyName.value = data.user.company_name
  exhibitorTradeName.value =data.user.company_trade_name
  exhibitorName.value = data.user.name + ' ' + data.user.surname
  exhibitorEmail.value = data.user.email

  dataExhibitor.value = data.user;
  ExhibitorIdFromNFC.value = dataExhibitor.value.id;
  console.warn("ExhibitorIdFromNFC", ExhibitorIdFromNFC.value);
  ExhibitorTradeName.value = dataExhibitor.value.company_trade_name;
  ExhibitorLogoUrl.value = dataExhibitor.value.full_url_logo;
};

const fetchExhibitorIdByTableNumber = async () => {
  const { data } = await $fetch(
    `${API_ENDPOINT}/meeting-spaces`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );
  // Utiliza 'find' para buscar una coincidencia
  let tableNameUpper = props.tableName.replace(/t/g, 'T')
  tableNameUpper = tableNameUpper.replace(/h/g, 'H')

  ExhibitorIdfromTableNumber.value = data.find(table => table.table_name == tableNameUpper);
  ExhibitorIdfromTableNumber.value = 52
};

const fetchProfessionalfromNFC = async () => {
  // https://andalusiancrushlink.com/api/bracelet/3034/true
  const { data } = await $fetch(
    `${API_ENDPOINT}/bracelet/${nfcSerialNumberProfessional.value}`,
    {
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );

  dataProfessional.value = data;

  // professionalName.value = "NOMBREEEEE";
  professionalName.value = dataProfessional.value.user.name;
  // console.log("NAMEEEE", professionalName.value);
  professionalEmail.value = dataProfessional.value.user.email;
  professionalCompanyName.value = dataProfessional.value.user.company_name;

  // console.log(dataExhibitor);
};

const postMeetingSlotBlock = async () => {
  alert("ExhibitorIdFromNFC::::: " + ExhibitorIdFromNFC.value);
  const body = {
            // meeting_space_id: MeetingSpaceId.value,
            meeting_space_id: 43,
    user_id: ExhibitorIdFromNFC.value,
  };

  try {
    // Realizar la solicitud POST y obtener la respuesta completa
    const response = await $fetch(`${API_ENDPOINT}/meeting-slot-block`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: BEARER_TOKEN,
      },
    });

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      // Si el estado es 200, acceder al cuerpo de la respuesta (asumiendo que 'response' tiene una propiedad 'data')
      const data = response.data;
      // alert("DATA: " + data);
      console.log(data);
    } else {
      // Manejar otros estados HTTP según sea necesario
      console.error("Respuesta no exitosa:", response.status);
    }
  } catch (error) {
    // Manejar errores de la solicitud (incluidos los estados HTTP no exitosos si $fetch arroja excepciones para estos)
    console.error("Error en la solicitud:", error);
  }
};

const postMeetingData = async () => {
  alert(exhibitorCompanyName.value)
  console.log("dataExhibitor.value", dataExhibitor.value)
  const body = {
    company_name: exhibitorCompanyName.value,
    company_tradename: exhibitorTradeName.value,
    company_username: exhibitorName.value,
    company_email: exhibitorEmail.value,
    professional_fullname: professionalName.value,
    professional_company: professionalCompanyName.value,
    professional_email: professionalEmail.value,
    professional_sector: professionalCompanyType.value,
  };

  const { data } = await $fetch(`${runtimeConfig.public.NODE_SERVER_URL}/api/save-meeting-json`, {
  // const { data } = await $fetch(`${runtimeConfig.public.BACKEND_SERVER_URL}/`, {
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

  // alert("DATA: " + data);
  console.log(data);
};

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}


/////////////////////////////////
/////////////////////////////////
// START MEETING 
/////////////////////////////////
/////////////////////////////////
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
  // if(!isHot.value && (ExhibitorIdFromNFC.value !== ExhibitorIdfromTableNumber.value)) {
  //   alert ("You are not allowed to reserve this table")
  // }
  // else {
    postMeetingSlotBlock();
    postMeetingData();
    emitChangeStep(5);
  // }

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

  if(!isHot.value) {
    fetchExhibitorbyId(ExhibitorIdfromTableNumber.value);

    // fetchExhibitorIdByTableNumber()
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
  // alert("SCAN NFC STEP 1 CLICKED");
  scanText1.value = ref("Swipe the wristband across the rear NFC reader for scanning");
  if (nfcSimulate.value) {
    nfcSerialNumberExhibitor.value = nfcSerialNumberExhibitorTest.value;
    nfcStatus.value = "> Scanning...";
  } else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("Swipe the wristband across the rear NFC reader for scanning");
      nfcStatus.value = "> Scanning...";
      ndef.addEventListener("readingerror", () => {
        nfcLog2.value = "Argh! Cannot read data from the NFC tag. Try another one?";
      });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        alert("NFC 1 SCANNED: " + serialNumber);
        nfcSerialNumberExhibitor.value = serialNumber;
        // Detener el escaneo después de una lectura exitosa
        ndef.stop().then(() => {
          console.log("NFC scanning stopped");
          nfcStatus.value = "> Scanning stopped";
        }).catch((error) => {
          console.error("Error stopping NFC scan", error);
        });
      });
    } catch (error) {
      nfcLog3.value = "Argh! " + error;
    }
    ndef.stop()
  }
};
const scanNFCStep2Click = async () => {
  console.log("SCAN NFC STEP 2 CLICKED");
  // scanButton.addEventListener("click", async () => {
  
  scanText2.value = ref("Swipe the wristband across the rear NFC reader for scanning");
  nfcLog0.value = "User Clicked Button";
  if (nfcSimulate.value) {
    nfcSerialNumberProfessional.value = nfcSerialNumberProfessionalTest.value;  
    nfcStatus.value = "> Scanning...";
  } else {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcStatus.value = "> Scanning...";
      ndef.addEventListener("readingerror", () => {
        nfcLog2.value = "Argh! Cannot read data from the NFC tag. Try another one?";
      });
      ndef.addEventListener("reading", ({ message, serialNumberPro }) => {
        alert("NFC 2 SCANNED: " + serialNumberPro);
        nfcSerialNumberProfessional.value = serialNumberPro;
        // Detener el escaneo después de una lectura exitosa
        ndef.stop().then(() => {
          console.log("NFC scanning stopped");
          nfcStatus.value = "> Scanning stopped";
        }).catch((error) => {
          console.error("Error stopping NFC scan", error);
        });
      });
    } catch (error) {
      nfcLog3.value = "Argh! " + error;
    }
  }
};

watch(nfcSerialNumberExhibitor, (newVal, oldVal) => {
  if (newVal !== "") {
    nfcSerialNumberExhibitor.value = newVal.replace(/:/g, "");
    fetchExhibitorfromNFC();
    emitChangeStep(2);
    nfcLog2.value = `> Serial Number: ${nfcSerialNumberExhibitor.value}`;
  }
  // console.warn ("NFCCCC " + ExhibitorIdfromTableNumber.value + " NFCCCC " + ExhibitorIdFromNFC.value);
  // if(!isHot.value) {
  //   if(ExhibitorIdfromTableNumber.value !== ExhibitorIdFromNFC.value) {
  //     console.warn("NO COINCIDE EL NFC CON LA MESA");
  //     nfcStatus.value = `NO COINCIDE NFC CON LA MESA`;
  //   } 
  //   else {
  //     nfcStatus.value = `SI COINCIDE EL NFC CON LA MESA`
  //     if (newVal !== "") {
  //       nfcSerialNumberExhibitor.value = newVal.replace(/:/g, "");
  //       fetchExhibitorfromNFC();
  //       emitChangeStep(2);
  //       // nfcLog2.value = `> Serial Number: ${nfcSerialNumberExhibitor.value}`;
  //     }
  //   }
  // }
  // else {
  //   if (newVal !== "") {
  //     nfcSerialNumberExhibitor.value = newVal.replace(/:/g, "");
  //     fetchExhibitorfromNFC();
  //     emitChangeStep(2);
  //     // nfcLog2.value = `> Serial Number: ${nfcSerialNumberExhibitor.value}`;
  //   }
});

watch(nfcSerialNumberProfessional, (newVal, oldVal) => {
  console.log("nfcSerialNumberProfessional changed");
  if (newVal !== "") {
    nfcLog2.value = `> Serial Number: ${nfcSerialNumberProfessional.value}`;
    nfcSerialNumberProfessional.value = newVal.replace(/:/g, "");
    fetchProfessionalfromNFC();
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
  scanText1.value = "";
  scanText2.value = "";
  dataExhibitor.value = {};
  dataProfessional.value = {};
  exhibitorCompanyName.value = ""
  exhibitorTradeName.value = ""
  exhibitorName.value = ""
  exhibitorEmail.value = ""
};
</script>

<template>
  <!-- <button @click="scanNFCclicked"> Scan</button> -->
  <!-- <h3>Live Output</h3> -->
  <div id="output" v-if="false" class="output">
    <div id="content">{{ nfcContent }}</div>
    <div id="status">{{ nfcStatus }}</div>
    <pre id="log" style="color: #0000ff">{{ nfcLog0 }}</pre>
    <pre id="log" style="color: #0000ff">{{ nfcLog1 }}</pre>
    <pre id="log" style="color: #00ff00">{{ nfcLog2 }}</pre>
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
            <div class="scanIcon" v-if="scanText1 ==''">
              <img src="/img/tablet/mano-tablet-blanco@2x.png" alt="" />
            </div>
            <div class="text">
              <div class="subtitle" v-if="scanText1==''">SCAN TO RESERVE</div>
              <div class="hit" v-if="scanText1==''">(ONLY ANDALUSIAN PROFESSIONAL)</div>
              <div class="cta">
                <div class="btn" @click="scanNFCStep1Click" v-if="scanText1 ==''" >
                <!-- Press to Scan Bracelet -->
                <img src="/img/tablet/btn-press-to-scan-bracelet.png" alt="" />
                </div>
                <!-- <div class="btn" @click="emitChangeStep(2)">Ir a paso 2</div> -->
                <div id="log" style="color: #ffffff">{{ scanText1 }}</div>
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
              <div id="log" style="color: #ffffff; text-align: left">{{ scanText2 }}</div>
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
              <p><strong><span style="font-size:22pt;">Privacy</span></strong></p>
              <p><strong><span style="font-size:11pt;">Privacy Policy and Data Protection Regulations</span></strong></p>
              <p><span>Through this portal, no personal data is collected from users without their consent.</span></p>
              <p><span>The personal data provided during your registration on the website, as well as any information provided through the use of the portal, will be treated confidentially for the sole and specific purpose of each processing. These data will be incorporated into the corresponding processing activities of the Public Company for the Management of Tourism and Sports in Andalusia, in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council on the protection of personal data (General Data Protection Regulation) and Organic Law 3/2018, of December 5, on Personal Data Protection and guarantee of digital rights.</span></p>
              <p><span>Text fields identified as mandatory in the Registered User registration form must be completed by the interested parties. Failure to complete any of them could prevent the processing of your registration as a Registered User.</span></p>
              <p><span>In compliance with Article 32 of the GDPR regarding the security of processing, the website management company has implemented appropriate technical and organizational measures to ensure an adequate level of security that guarantees the security of data and prevents its alteration, loss, treatment, or unauthorized access. This is done considering the state of the art, nature, scope, context, and purposes of processing.</span></p>
              <p><span>The legitimacy of the processing is based on the consent of the users, in accordance with Article 6.1 a) of the GDPR.</span></p>
              <p><span>The personal data provided will be kept for the time necessary to fulfill the purpose for which they are collected, as specified in each processing activity.</span></p>
              <p><span>The collected data will only be subject to transfer, if applicable, with the prior consent of the interested party, and the recipients of the different processing activities can be consulted in the Registry of Processing Activities of the entity.</span></p>
              <p><span>The portal contains links to third-party websites with privacy policies unrelated to its own, for which it is not responsible. You will decide on the acceptance of those policies.</span></p>
              <p><span>Individuals whose personal data is processed by the entity can exercise the rights of access, rectification, erasure, objection, restriction of processing, and data portability, as well as object to automated individual decision-making, including profiling, as provided by current legislation. This can be done by contacting the data controller by sending a communication, including a copy of your ID, to the following email address: andalucia@andalucia.org, or to the address of the Public Company for the Management of Tourism and Sports in Andalusia at C/ Compa&ntilde;&iacute;a, 40 29008 M&aacute;laga (Spain).</span></p>
              <p><span>Users also have the right to file a complaint with the Spanish Data Protection Agency.</span></p>
              <p><span>By checking the corresponding box labeled &quot;I wish to receive the Newsletter,&quot; you authorize the Public Company for the Management of Tourism and Sports in Andalusia to send you information and promotional communications through any means, including electronic (email, etc.), regarding activities, initiatives, and/or services organized or sponsored by the Public Company for the Management of Tourism and Sports in Andalusia and/or the Ministry of Tourism, Trade, and Sports of the Andalusian Regional Government.</span></p>
              <p><span>In this regard, you can oppose the processing of your data for this purpose at any time, either when providing the data by checking the box included in the corresponding data collection forms or at any later time by sending an email to andalucia@andalucia.org or using specific means recognized in the commercial communications themselves.</span></p>
              <p><span>Similarly, by checking the acceptance box for the recommendation engine, you agree that recommendations will be shown during your navigation on the portal based on your interests to improve your browsing experience.</span></p>
              <p><span>Legal Notice</span></p>
              <p><span>Content Responsibility</span></p>
              <p><span>The Registered User undertakes to comply punctually with all the terms set out in the Terms of Use and not to use the website for illegal, fraudulent, or unauthorized purposes under the Terms of Use. In this regard, the Registered User will be responsible for the legal consequences arising from non-compliance with the terms set out in these Terms of Use.</span></p>
              <p><span>The Public Company for the Management of Tourism and Sports in Andalusia will only be responsible for damages that the Registered User may suffer from the use of the website when such damages are due to our intentional actions.</span></p>
              <p><span>The Public Company for the Management of Tourism and Sports in Andalusia is not responsible for the legality of other third-party websites from which access to the portal is possible.</span></p>
              <p><span>Modification of Terms of Use</span></p>
              <p><span>These Terms of Use are currently in effect. However, the Public Company for the Management of Tourism and Sports in Andalusia reserves the right to modify these Terms of Use at any time while respecting current regulations, without such modification having retroactive effect.</span></p>
              <p><span>Nullity of Clauses</span></p>
              <p><span>In the event that any of the provisions contained in these Terms of Use is declared null, it will be removed or replaced. In any case, such a declaration of nullity will not affect the validity of the other provisions contained in these Terms of Use.</span></p>
              <p><span>Applicable Legislation</span></p>
              <p><span>Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce (LSSI).</span></p>
              <p><span>Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27, 2016, regarding the protection of individuals concerning the processing of personal data and the free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation).</span></p>
              <p><span>Organic Law 3/2018, of December 5, on Personal Data Protection and guarantee of digital rights.</span></p>
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
      <!-- <Tablet_Header
        :countDownCount="remaingTimeText"
        ctaGoToStep="1"
        ctaText="false"
        tableText="false"
        @changeStep="emitChangeStep(1)"
      /> -->
      <Tablet_Header
        :countDownCount="remaingTimeText"
        ctaGoToStep="4"
        ctaText="Exit Table"
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
      .hit {
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
