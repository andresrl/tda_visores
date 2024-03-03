<script setup>
import { ref, onBeforeMount } from "vue";
const runtimeConfig = useRuntimeConfig();

const BEARER_TOKEN = "Bearer 5|ne4srosIMQWM3lTyAZfIH28RONnIvinPDOhu7qdWb65ac5d3";

const reuniones = ref([]);

onBeforeMount(() => {
  // fecth Meetings
  fetchMeetings();
});

const fetchMeetings = async () => {
  try {
    const data = await $fetch(
      `${runtimeConfig.public.NODE_SERVER_URL}/api/get-meetings`,
      {
        headers: {
          Authorization: BEARER_TOKEN,
        },
      }
    );
    reuniones.value = data;
    console.log("DATAAAA", data);
  } catch (error) {
    console.error("Error fetching meetings:", error);
  }
};

</script>
<template>
  <div class="wrapper">
    <h1>Reuniones</h1>
    <div class="total">Total: {{ reuniones.length }}</div>
    <div v-for="reunion in reuniones" :key="reunion.id" class="reunion">
      <h3>
        {{ reunion.company_tradename }}
      </h3>
      <p>
        <span>Expositor:</span> {{ reunion.company_name }}<br>
        <span>Expositor Nombre:</span> {{ reunion.company_username }}<br>
        <span>Expositor Email:</span> {{ reunion.company_email }}<br>
        <span>Profesional Compañía:</span> {{ reunion.professional_company }}<br>
        <span>Profesional Nombre:</span> {{ reunion.professional_fullname }}<br>
        <span>Profesional Email:</span> {{ reunion.professional_email }}<br>
        <span>Profesional Sector:</span> {{ reunion.professional_sector }}<br>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin: 20px 30px;
  font-family: "Barlow-SemiBold";
}
h1 {
  font-family: "Barlow-SemiBold";
  margin: 0 0 0 0;
}

.total {
  font-size: 30px;
  margin: 20px 0;
  font-family: "Barlow-SemiBold";
}
.reunion {
  margin: 20px 30px;
  // border-bottom: 1px solid #333;
  font-family: "Barlow-SemiBold";
}

h3 {
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 0 0;
}
p {
  color: #777;
  font-size: 16px;
  margin: 0 0 20px 0;
  span {
    font-family: "Barlow-Black";
  }
}

</style>
