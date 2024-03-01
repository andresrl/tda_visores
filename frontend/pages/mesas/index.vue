<script setup>
import { onBeforeUnmount } from "vue";

const FETCH_INTERVAL = 30_000;

const BEARER_TOKEN =
  "Bearer 5|ne4srosIMQWM3lTyAZfIH28RONnIvinPDOhu7qdWb65ac5d3";
const API_ENDPOINT = "https://andalusiancrushlink.com/api";

let interval = null;

const organizers = ref([]);
const spaces = ref([]);
const slots = ref([]);
const mesaSeleccionada = ref(null);

provide("spaces", spaces);
provide("slots", slots);
provide("organizers", organizers);
provide("mesaSeleccionada", mesaSeleccionada);

const fetchOrganizers = async () => {
  const { data } = await $fetch(`${API_ENDPOINT}/companies`, {
    headers: {
      Authorization: BEARER_TOKEN,
    },
  });

  organizers.value = data;
};

const fetchMeetingSpaces = async () => {
  const { data } = await $fetch(`${API_ENDPOINT}/meeting-spaces`, {
    headers: {
      Authorization: BEARER_TOKEN,
    },
  });

  spaces.value = data;
};

const fetchMeetingSlots = async () => {
  const { data } = await $fetch(`${API_ENDPOINT}/meeting-slots`, {
    headers: {
      Authorization: BEARER_TOKEN,
    },
  });

  // const now = new Date("2024-03-05T09:12:00.000000Z");
  const now = new Date();

  slots.value = data
    .filter((item) => item.organizer_id)
    .filter((item) => {
      const startsAt = new Date(item.starts_at);
      const endsAt = new Date(item.ends_at);

      return now >= startsAt && now <= endsAt;
    })
    .map((slot) => {
      const organizer = organizers.value.find(
        (organizer) => organizer.id === slot.organizer_id,
      );

      const meetingSpace = spaces.value.find(
        (meetingSpace) => meetingSpace.id === slot.meeting_space_id,
      );

      return { ...slot, organizer, meetingSpace };
    });
};

onMounted(() => {
  fetchOrganizers().then(fetchMeetingSpaces).then(fetchMeetingSlots);

  interval = setInterval(() => {
    fetchOrganizers().then(fetchMeetingSpaces).then(fetchMeetingSlots);
  }, FETCH_INTERVAL);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
<template>
  <div>
    <div class="container align-items-start justify-content-between">
      <div class="flex gap-big">
        <div class="flex flex-column text-center">
          <img src="/img/logo.png" alt="Logo" id="logo" />
          <h1>MATCH & MEET</h1>
          <div style="margin: 2em 0">
            <img
              src="/img/mano-dedo.png"
              width="200"
              style="text-align: center"
            />
          </div>
          <h2>FIND THE FREE TABLE</h2>
          <h2>AND CONTACT THE COMPANY</h2>
          <div class="flex flex-column gap ms-auto mt-auto">
            <div class="flex gap">
              <Mesa :mesa="'T23'" @click="mesaSeleccionada = 'T23'" />
              <Mesa :mesa="'T25'" @click="mesaSeleccionada = 'T25'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T24'" @click="mesaSeleccionada = 'T24'" />
              <Mesa :mesa="'T26'" @click="mesaSeleccionada = 'T26'" />
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-column gap ms-auto">
            <div class="flex gap">
              <Mesa :mesa="'T1'" @click="mesaSeleccionada = 'T1'" />
              <Mesa :mesa="'T3'" @click="mesaSeleccionada = 'T3'" />
              <Mesa :mesa="'T5'" @click="mesaSeleccionada = 'T5'" />
              <Mesa :mesa="'T7'" @click="mesaSeleccionada = 'T7'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T2'" @click="mesaSeleccionada = 'T2'" />
              <Mesa :mesa="'T4'" @click="mesaSeleccionada = 'T4'" />
              <Mesa :mesa="'T6'" @click="mesaSeleccionada = 'T6'" />
              <Mesa :mesa="'T8'" @click="mesaSeleccionada = 'T8'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T9'" @click="mesaSeleccionada = 'T9'" />
              <Mesa :mesa="'T11'" @click="mesaSeleccionada = 'T11'" />
              <Mesa :mesa="'T13'" @click="mesaSeleccionada = 'T13'" />
              <Mesa :mesa="'T15'" @click="mesaSeleccionada = 'T15'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T10'" @click="mesaSeleccionada = 'T10'" />
              <Mesa :mesa="'T12'" @click="mesaSeleccionada = 'T12'" />
              <Mesa :mesa="'T14'" @click="mesaSeleccionada = 'T14'" />
              <Mesa :mesa="'T16'" @click="mesaSeleccionada = 'T16'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T17'" @click="mesaSeleccionada = 'T17'" />
              <Mesa :mesa="'T19'" @click="mesaSeleccionada = 'T19'" />
              <Mesa :mesa="'T21'" @click="mesaSeleccionada = 'T21'" />
            </div>
            <div class="flex gap">
              <Mesa :mesa="'T18'" @click="mesaSeleccionada = 'T18'" />
              <Mesa :mesa="'T20'" @click="mesaSeleccionada = 'T20'" />
              <Mesa :mesa="'T22'" @click="mesaSeleccionada = 'T22'" />
            </div>
          </div>
        </div>
        <div class="flex flex-column gap ms-auto">
          <div class="flex gap">
            <Mesa :mesa="'H1'" />
            <Mesa :mesa="'H3'" />
          </div>
          <div class="flex gap">
            <Mesa :mesa="'H2'" />
            <Mesa :mesa="'H4'" />
          </div>
          <div class="flex gap">
            <Mesa :mesa="'H5'" />
            <Mesa :mesa="'H7'" />
          </div>
          <div class="flex gap">
            <Mesa :mesa="'H6'" />
            <Mesa :mesa="'H8'" />
          </div>
        </div>
        <div class="flex flex-column gap ms-auto">
          <div class="flex gap">
            <Mesa :mesa="'T27'" @click="mesaSeleccionada = 'T27'" />
            <Mesa :mesa="'T28'" @click="mesaSeleccionada = 'T28'" />
            <Mesa :mesa="'T29'" @click="mesaSeleccionada = 'T29'" />
          </div>
          <div class="flex gap justify-content-center">
            <Mesa :mesa="'T30'" @click="mesaSeleccionada = 'T30'" />
            <Mesa :mesa="'T31'" @click="mesaSeleccionada = 'T31'" />
          </div>
          <BloqueEmpresaSeleccionada />
        </div>
      </div>
    </div>
    <footer>
      <img src="/img/footer.png" alt="Footer" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
$verde: #00c683;

footer {
  background: $verde;
  margin-top: auto;
  padding: 1em;
}

.container {
  background: black;
  overflow: hidden;
  box-sizing: border-box;
  padding: 3.5em;
}

h1 {
  color: $verde;
  font-size: 2.7em;
  font-family: Barlow-ExtraLightItalic;
  line-height: 1;
  margin-top: 2em;
}

h2 {
  color: $verde;
  font-size: 1.6em;
  font-family: Barlow-ExtraLight;
  font-style: italic;
  line-height: 1;
  margin: 0;
  white-space: nowrap;
}

.gap {
  gap: 1em;
}

.gap-big {
  gap: 4em;
}
</style>
