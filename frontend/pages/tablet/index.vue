<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
</script>

<template>
  <NotFound v-if="connectionLost" />
  <Tablet_Main id="0" />
</template>

<style lang="scss" scoped>
</style>
