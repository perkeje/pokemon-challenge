<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/layouts/Navbar.vue';
</script>

<template>
  <Navbar/>
  <div class="background-wrapper">
    <div class="background-inner">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.background-wrapper {
    background-repeat: no-repeat;
    background-image: url('./assets/images/Pokémon-wallpapers-5.jpg');
    background-size: cover;
    background-position: 50%;
    height: 100vh;
    width: 100%;
}

.background-inner {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
