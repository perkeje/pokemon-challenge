<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import Navbar from "./components/layouts/Navbar.vue";
import Modal from "./components/Modal.vue";
import Pokedex from "./components/Pokedex.vue";
import ThemeButton from "./components/layouts/ThemeButton.vue";
import AuthGuard from "./components/AuthGuard.vue";
import wallpaper1 from '@/assets/images/wallpaperbetter.jpg'
import wallpaper2 from '@/assets/images/wallpaperbetter1.jpg';
import wallpaper3 from '@/assets/images/wallpaperbetter2.jpg';
import wallpaper4 from '@/assets/images/wallpaperbetter3.jpg';
import wallpaper5 from '@/assets/images/wallpaperbetter4.jpg';
import wallpaper6 from '@/assets/images/wallpaperbetter5.jpg';

const wallpapers = [
  wallpaper1,
  wallpaper2,
  wallpaper3,
  wallpaper4,
  wallpaper5,
  wallpaper6,
];
const backgroundImg = ref(wallpapers[5]);
// let index = 0;

// const changeBackground = () => {
//   index = (index + 1) % wallpapers.length;
//   backgroundImg.value = wallpapers[index];
//   setTimeout(() => changeBackground(), 500);
// };

// onMounted(() => {
//   setTimeout(() => changeBackground(), 500);
// });
</script>

<template>
  <div
    class="background-wrapper"
    :style="{ 'background-image': `url(${backgroundImg})` }"
  >
    <div class="background-inner"></div>
  </div>
  <Navbar />
  <AuthGuard>
    <RouterView />
    <Modal>
      <Pokedex />
    </Modal>
  </AuthGuard>
  <ThemeButton />
</template>

<style scoped>
.background-wrapper {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: -1;
  transition: background-image 0.5s ease-in;
}

.background-inner {
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  position: fixed;
}
</style>
