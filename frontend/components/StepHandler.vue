<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import WrapperTablet from "~/components/WrapperTablet.vue";

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["changeStep"]);

// Función para emitir el evento changeStep
function emitChangeStep(step) {
  emit("changeStep", step);
}
</script>

<template>
  <div>
    <WrapperTablet v-if="step === 1"> CONTENIDO 1 </WrapperTablet>
    <WrapperTablet v-if="step === 2"> CONTENIDO 2 </WrapperTablet>
    <WrapperTablet v-if="step === 3"> CONTENIDO 3 </WrapperTablet>
    <WrapperTablet v-if="step === 4"> CONTENIDO 4 </WrapperTablet>
    <WrapperTablet v-if="step === 5"> CONTENIDO 5 </WrapperTablet>

    <button v-if="step !== 5" @click="emitChangeStep(step + 1)">
      Cambiar al siguiente paso
    </button>
    <button v-if="step === 5" @click="emitChangeStep(1)">
      Volver al Paso 1
    </button>
  </div>
</template>

<style lang="scss" scoped>
$verde: #00ce7e;
$rojo: #d41c24;
$naranja: #e2973b;
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
