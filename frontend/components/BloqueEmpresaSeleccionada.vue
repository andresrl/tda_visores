<script setup lang="ts">
const spaces = inject("spaces");
const slots = inject("slots");
const organizers = inject("organizers");
const mesaSeleccionada = inject("mesaSeleccionada");

const empresa = computed(() => {
  if (!mesaSeleccionada.value) {
    return;
  }

  const space = spaces.value.find(
    (space) => space.table_name === mesaSeleccionada.value,
  );

  if (space?.user_id) {
    return organizers.value.find(
      (organizer) => organizer.id === space?.user_id,
    );
  }

  const slot = slots.value.find((slot) => slot.meeting_space_id === space?.id);
  return organizers.value.find(
    (organizer) => organizer.id === slot?.organizer_id  || organizer.id === slot?.requester_id,
  );
});
</script>

<template>
  <div v-if="empresa" class="contenedor">
    <div style="display: flex">
      <div style="flex: 1">
        <div class="table">Table</div>
        <div class="table-number">
          Nº <span>{{ mesaSeleccionada?.substring(1) }}</span>
        </div>
      </div>
      <div style="flex: 1">
        <img
          :src="empresa?.full_url_logo"
          alt="Logo"
          width="100%"
          height="200"
          style="object-fit: contain"
        />
      </div>
    </div>
    <div class="empresa">
      {{ empresa?.company_trade_name }}
    </div>
    <div class="ciudad">
      {{ empresa?.locality }}
    </div>
    <div class="sector">
      {{ empresa?.company_type?.name }}
    </div>

    <div class="descripcion">{{ empresa?.company_description }}</div>
  </div>
</template>

<style scoped lang="scss">
$verde: #00ce7e;

.contenedor {
  border: 0.1em solid white;
  border-radius: 0.1em;
  padding: 1em 3em;
  width: 800px;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 1000px;
}

.texto-verde {
  color: $verde;
}

.texto-blanco {
  color: white;
}

.table {
  font-size: 2em;
  color: $verde;
}

.table-number {
  color: $verde;
  font-family: Barlow-SemiBold;
  font-size: 4em;
  margin-top: -0.4em;
}

.empresa {
  color: $verde;
  font-size: 2em;
  font-family: Barlow-SemiBold;
}

.ciudad,
.sector,
.descripcion {
  color: white;
  font-family: Barlow-ExtraLight;
}

.descripcion {
  margin-top: 2em;
  overflow: hidden;
  flex: 1;
  font-family: Barlow-ExtraLight;
}
</style>
