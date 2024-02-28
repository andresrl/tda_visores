<script setup>
  import { ref } from "vue";

  const step = ref(1);

  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  function handleChangeStep(newStep) {
    step.value = newStep;
  }
</script>

<template>
  <Tablet_StepHandler :step="step" :id="props.id" @changeStep="handleChangeStep" />
</template>

<style lang="scss" scoped>

$verde: #00ce7e;
$rojo: #D41C24;
$naranja: #E2973B;
.tabletWrapper {
  width: 800px;
  height: 1280px;
  background-color: #f1f1f1;
  @media (min-width: 801px) {
    width: 1280px;
    height: 800px;
  }
}

h1 {
  margin: 0;
}

</style>
