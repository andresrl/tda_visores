<script setup>
const props = defineProps({
  currentSlideIndex: Number,
  index: Number,
  post: Object,
});

const isAnimated = computed(() => {
  return props.currentSlideIndex === props.index;
});
</script>
<template>
  <div
    class="wrapper"
    :class="{ 'animate__animated animate__fadeIn': isAnimated }"
  >
    <img
      src="/img/logo.png"
      alt="Logo"
      class="logo"
      :class="{ 'animate__animated animate__bounceIn': isAnimated }"
    />
    <img
      :src="post.photo"
      :alt="post.title"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    />
    <h1 :class="{ 'animate__animated animate__slideInUp': isAnimated }">
      {{ post.title }}
    </h1>
    <div
      class="content"
      :class="{ 'animate__animated animate__slideInUp': isAnimated }"
    >
      {{ post.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  background: black;
  min-height: 100vh;
}
.logo {
  width: 50%;
  margin: 4em auto;
}
h1 {
  color: white;
  font-family: "Barlow-ExtraLightItalic";
  text-align: center;
  font-size: 6em;
}
.content {
  color: white;
  padding: 0 2em;
  font-size: 3em;
}
</style>
