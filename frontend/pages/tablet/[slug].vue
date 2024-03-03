<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';

// Usa useRoute para acceder al objeto de ruta actual
const route = useRoute();

// Crea una referencia reactiva para el slug
const slug = ref('');

// Observa los cambios en la ruta y actualiza el slug
watch(() => route.params, (newParams) => {
  slug.value = newParams.slug;
}, { immediate: true });

</script>

<template>
  <NotFound v-if="connectionLost" />
  <Tablet_Main :tableName="slug" />
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
