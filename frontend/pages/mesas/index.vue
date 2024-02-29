<script setup>
const BEARER_TOKEN =
  "Bearer 5|ne4srosIMQWM3lTyAZfIH28RONnIvinPDOhu7qdWb65ac5d3";
const API_ENDPOINT = "https://andalusiancrushlink.com/api";

const organizers = ref([]);
const spaces = ref([]);
const slots = ref([]);

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

  slots.value = data.map((slot) => {
    const organizer = organizers.value.find(
      (organizer) => organizer.id === slot.organizer_id,
    );

    const meetingSpace = spaces.value.find(
      (meetingSpace) => meetingSpace.id === slot.meeting_space_id,
    );

    return { ...slot, organizer, meetingSpace };
  });
};

const getCurrentCompanyNameOfSpace = (table_name) => {
  const space = spaces.value.find((space) => space.table_name === table_name);
  const slot = slots.value.find((slot) => slot.meeting_space_id === space.id);

  return slot?.organizer?.company_name;
};

onMounted(() => {
  fetchOrganizers().then(fetchMeetingSpaces).then(fetchMeetingSlots);
});
</script>
<template>
  <div class="container flex align-items-start justify-content-between">
    <div class="flex gap-big">
      <div class="flex flex-column text-center">
        <img src="/img/logo.png" alt="Logo" id="logo" />
        <h1>MATCH<br />&<br />MEET</h1>
        <div class="flex flex-column gap ms-auto mt-auto">
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T23')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T25')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T24')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T26')" />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-column gap ms-auto">
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T1')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T3')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T5')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T7')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T2')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T4')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T6')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T8')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T9')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T11')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T13')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T15')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T10')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T12')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T14')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T16')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T17')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T19')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T21')" />
          </div>
          <div class="flex gap">
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T18')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T20')" />
            <Mesa :empresa="getCurrentCompanyNameOfSpace('T22')" />
          </div>
        </div>
      </div>
      <div class="flex flex-column gap ms-auto">
        <div class="flex gap">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H1')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H3')" />
        </div>
        <div class="flex gap">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H2')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H4')" />
        </div>
        <div class="flex gap">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H5')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H7')" />
        </div>
        <div class="flex gap">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H6')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('H8')" />
        </div>
      </div>
      <div class="flex flex-column gap ms-auto">
        <div class="flex gap">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('T27')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('T28')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('T29')" />
        </div>
        <div class="flex gap justify-content-center">
          <Mesa :empresa="getCurrentCompanyNameOfSpace('T30')" />
          <Mesa :empresa="getCurrentCompanyNameOfSpace('T31')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$verde: #00ce7e;

#logo {
  width: 300px;
}

.container {
  background: black;
  height: 100vh;
  padding: 6em;
  overflow: hidden;
  box-sizing: border-box;
}

h1 {
  color: white;
  font-size: 4em;
  font-family: Barlow-SemiBoldItalic;
  line-height: 1;
}

.gap {
  gap: 1em;
}

.gap-big {
  gap: 4em;
}
</style>
