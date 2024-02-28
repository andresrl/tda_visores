<script setup>

import { defineProps, computed } from "vue"

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

const wrapperClass = computed(() => {
  if (props.step === 2 || props.step === 3 || props.step === 4) {
    return "orange";
  } else if (props.step === 5) {
    return "red";
  }
  else {
    return "green";
  }
});

</script>
<template>
  <div class="wrapper" :class="wrapperClass">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
// cosas comunes

h1 {
  margin: 0;
}

$verde: #00ce7e;
$rojo: #d41c24;
$naranja: #e2973b;
.wrapper {
  width: 800px;
  height: 1280px;
  background-color: #f1f1f1;
  @media (min-width: 801px) {
    width: 1280px;
    height: 800px;
  }
  &.green {
    background-color: $verde;
  }
  &.orange {
    background-color: $naranja;
  }
  &.red {
    background-color: $rojo;
  }
}
</style>
