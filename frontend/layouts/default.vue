<template>
  <div>
    <div style="background-color: #ddd1ac; padding: 20px 0; display: flex; justify-content: center; font-size: 20px; font-weight: bold; color: red !important">
      <NuxtLink to="/" style="background-color: #3479c6; color: #fff; border-radius: 10px; padding: 15px; margin-right: 30px; text-decoration: none;">INICIO</NuxtLink>
      <NuxtLink to="/about" style="background-color: #3479c6; color: #fff; border-radius: 10px; padding: 15px; margin-right: 30px; text-decoration: none;">ACERCA DE</NuxtLink>
      <NuxtLink to="/contact" style="background-color: #3479c6; color: #fff; border-radius: 10px; padding: 15px; text-decoration: none;">CONTACTO</NuxtLink>
    </div>
    <div class="content">
      <slot />
      <div class="explanation">
        <p>La carga inicial de la página la entrega Node.js desde el servidor, con todos los contenidos de la página.</p>
        <p>Este método es el SSR (Server Side Rendering)</p>
        <p>Luego, la transforma en una SPA (Single Page Application), que lo que hace es que el resto de llamadas a la App (API) las hace mediante llamadas asíncronas al servidor, así que las renderizaciones son instantáneas</p>
        <p>Pero no solo eso, sino que en la llamada inicial a la página te envía TODAS LAS PÁGINAS de la APP, por lo que ir navegando de una a otra no requiere de conexión al servidor, ya que las ha cargado mediante archivos .js en el Navegador</p>
        <p>Lo único que le queda en cada página nueva que carge será cargar los contenidos dinámicos de la página (posts, imágenes no estáticas, textos de la base de datos).... es decir, todo el contenido no estático de esa página</p>
      </div>
    </div>
    <div class="footer">
      <p>
        (c) Copyright Footer de la App<br>
        (Común a todas las páginas)
      </p>
      <p>
        Viene del layout de la plantilla
      </p>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}
.footer {
  border-top: 2px solid #999;
  padding: 20px 0;
  text-align: center;
}

#__nuxt {
  width: 100%;
  max-width: 800px;
  border: 1px solid #999;
}

.content {
  padding: 30px;
}

.explanation {
  background-color: #ddd;
  font-size: 0.9rem;
  padding: 20px;
  margin: 20px 0;
}

h1 {
  text-align: center;
}

</style>