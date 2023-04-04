<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/layouts/Navbar.vue';

const wallpapers = ['./src/assets/images/wallpaperbetter.jpg', './src/assets/images/wallpaperbetter1.jpg', './src/assets/images/wallpaperbetter2.jpg', './src/assets/images/wallpaperbetter3.jpg', './src/assets/images/wallpaperbetter4.jpg', './src/assets/images/wallpaperbetter5.jpg']
const backgroundImg = ref(wallpapers[0])
let index = 0

const changeBackground = () => {
  index = (index + 1) % wallpapers.length;
  backgroundImg.value = wallpapers[index];
  setTimeout(() => changeBackground(), 20000);
}

setTimeout(() => changeBackground(), 20000);

</script>

<template>
  <div class="background-wrapper" :style="{ 'background-image': `url(${backgroundImg})` }">
    <div class="background-inner">
    </div>
  </div>
  <Navbar />
  <RouterView />
</template>

<style scoped>
.background-wrapper {
  transition: background-image 0.4s ease-in;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: -1;
}

.background-inner {
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  position: fixed;
}
</style>

