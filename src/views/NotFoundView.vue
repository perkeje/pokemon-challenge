<script setup lang="ts"></script>

<template>
  <div class="not-found-container">
    <h1>404 - Not Found</h1>
    <p>Uh-oh! It looks like this page is as elusive as a wild Mew.</p>
    <p>
      Return to the
      <router-link :to="{ name: 'home' }">Pokécenter</router-link> and start
      your journey again.
    </p>
  </div>
</template>

<style scoped>
.not-found-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  font-size: 1.8em;
  text-align: center;
  background-image: url("src/assets/images/surprised-pikachu.gif");
  z-index: -1;
}

.not-found-container a {
  color: #f6cf57;
  text-decoration: none;
}
</style>
