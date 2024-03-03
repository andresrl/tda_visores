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
  <div
    style="
      height: 100vh;
      background: black;
      display: flex;
      flex-direction: column;
    "
  >
    <div class="container align-items-start justify-content-between">
      <div class="flex gap-big flex-column">
        <div class="flex text-center">
          <div>
            <img src="/img/logo.png" style="width: 800px; height: auto" alt="Logo" id="logo" />
          </div>
          <div class="mesas-5 flex flex-column gap ms-auto">
            <div class="flex gap">
              <Mesa :mesa="'T27'" @seleccionada="mesaSeleccionada = 'T27'" />
              <Mesa :mesa="'T28'" @seleccionada="mesaSeleccionada = 'T28'" />
              <Mesa :mesa="'T29'" @seleccionada="mesaSeleccionada = 'T29'" />
            </div>
            <div class="flex gap justify-content-center">
              <Mesa :mesa="'T30'" @seleccionada="mesaSeleccionada = 'T30'" />
              <Mesa :mesa="'T31'" @seleccionada="mesaSeleccionada = 'T31'" />
            </div>
          </div>
        </div>
        <div class="flex flex-row gap mss-auto">
          <div class="mesas-22 flex">
            <div class="flex flex-column gap ms-auto">
              <div class="flex gap">
                <Mesa :mesa="'T1'" @seleccionada="mesaSeleccionada = 'T1'" />
                <Mesa :mesa="'T3'" @seleccionada="mesaSeleccionada = 'T3'" />
                <Mesa :mesa="'T5'" @seleccionada="mesaSeleccionada = 'T5'" />
                <Mesa :mesa="'T7'" @seleccionada="mesaSeleccionada = 'T7'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T2'" @seleccionada="mesaSeleccionada = 'T2'" />
                <Mesa :mesa="'T4'" @seleccionada="mesaSeleccionada = 'T4'" />
                <Mesa :mesa="'T6'" @seleccionada="mesaSeleccionada = 'T6'" />
                <Mesa :mesa="'T8'" @seleccionada="mesaSeleccionada = 'T8'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T9'" @seleccionada="mesaSeleccionada = 'T9'" />
                <Mesa :mesa="'T11'" @seleccionada="mesaSeleccionada = 'T11'" />
                <Mesa :mesa="'T13'" @seleccionada="mesaSeleccionada = 'T13'" />
                <Mesa :mesa="'T15'" @seleccionada="mesaSeleccionada = 'T15'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T10'" @seleccionada="mesaSeleccionada = 'T10'" />
                <Mesa :mesa="'T12'" @seleccionada="mesaSeleccionada = 'T12'" />
                <Mesa :mesa="'T14'" @seleccionada="mesaSeleccionada = 'T14'" />
                <Mesa :mesa="'T16'" @seleccionada="mesaSeleccionada = 'T16'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T17'" @seleccionada="mesaSeleccionada = 'T17'" />
                <Mesa :mesa="'T19'" @seleccionada="mesaSeleccionada = 'T19'" />
                <Mesa :mesa="'T21'" @seleccionada="mesaSeleccionada = 'T21'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T18'" @seleccionada="mesaSeleccionada = 'T18'" />
                <Mesa :mesa="'T20'" @seleccionada="mesaSeleccionada = 'T20'" />
                <Mesa :mesa="'T22'" @seleccionada="mesaSeleccionada = 'T22'" />
              </div>
            </div>
          </div>
          <div class="mesas-8 flex flex-column gap ms-auto">
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
        </div>
        <div class="flex flex-row gap mss-auto">
          <div class="mesas-4 flex flex-column gap mss-auto mt-auto">
              <div class="flex gap">
                <Mesa :mesa="'T23'" @seleccionada="mesaSeleccionada = 'T23'" />
                <Mesa :mesa="'T25'" @seleccionada="mesaSeleccionada = 'T25'" />
              </div>
              <div class="flex gap">
                <Mesa :mesa="'T24'" @seleccionada="mesaSeleccionada = 'T24'" />
                <Mesa :mesa="'T26'" @seleccionada="mesaSeleccionada = 'T26'" />
              </div>
          </div>
          <h1 style="margin-left: 400px; font-size: 4.7em;">MATCH & MEET</h1>
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
  margin-top: 1.5em;
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
