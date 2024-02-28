<script setup>
import { ref, onBeforeMount, onMounted } from "vue";

const props = defineProps({
  step: {
    type: Number,
    required: true
  }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(['changeStep']);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit('changeStep', step);
}

</script>

<template>
  <div>
    <slot></slot>
    <button v-if="step !== 5" @click="emitChangeStep(step + 1)">Cambiar al siguiente paso</button>
    <button v-if="step === 5" @click="emitChangeStep(1)">Volver al Paso 1</button>
  </div>
</template>

<style lang="scss" scoped>

$verde: #00ce7e;
$rojo: #D41C24;
$naranja: #E2973B;
.mainWrapper {
  width: 800px;
  height: 1280px;
  background-color: #f1f1f1;
  @media (min-width: 800px) {
    width: 1280px;
    height: 800px;
  }
}

</style>
