<template>
  <div class="wrapper">
    <!-- <h1>Error de Conexión</h1>
    <p>Parece que has perdido la conexión a Internet. Por favor, Espera a que la conexion Vuelva.</p> -->
    <img src="/img/fondos/not-found-full.png" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 2304px;
  height: 768px;
  background: #000;
  position: relative;
  line-height: 1.2;
  background: url("/img/fondos/not-found.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  font-weight: 700;
}
/* .not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.not-found h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

.not-found p {
  font-size: 1.2em;
} */
</style>
