<script setup>

</script>

<template>
  <NotFound v-if="connectionLost" />
  <TabletStep1 v-else />
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

//1.54
</style>
