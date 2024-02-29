<script setup>
defineProps({
  id: String,
  empresa: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div
    class="mesa text-center flex align-items-center justify-content-center"
    :class="{ libre: !empresa, ocupada: !!empresa }"
  >
    <div>{{ empresa ?? "Libre" }}</div>
  </div>
</template>

<style scoped lang="scss">
$verde: #00ce7e;

.mesa {
  text-transform: uppercase;
  height: 110px;
  width: 110px;
  font-family: Barlow-Black;
  font-size: 1.2em;
  line-height: 1em;
  border: 0.3em solid $verde;
}

.ocupada {
  color: $verde;
}

.libre {
  background: $verde;
}
</style>
