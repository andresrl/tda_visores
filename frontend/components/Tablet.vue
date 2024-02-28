<script setup>
  import { ref, onBeforeMount, onMounted } from "vue";

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
  <div class="tabletWrapper">
    <div class="content">
      <h1>Tablet</h1>
      <p>EMPRESA: {{ props.id }}</p>
      <StepHandler :step="step" @changeStep="handleChangeStep" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

$verde: #00ce7e;
$rojo: #D41C24;
$naranja: #E2973B;
.tabletWrapper {
  width: 800px;
  height: 1280px;
  background-color: #f1f1f1;
  @media (min-width: 800px) {
    width: 1280px;
    height: 800px;
  }
}

</style>
