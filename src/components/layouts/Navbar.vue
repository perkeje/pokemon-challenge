<template>
  <nav class="nav">
    <div class="nav_inner">
      <div class="nav_inner-left">
        <RouterLink :to="{ name: 'home' }">
          <img
            class="pokeball-logo"
            src="../../assets/images/logo.png"
            alt="pokeball"
          />
        </RouterLink>
      </div>
      <div class="nav_inner-right" v-if="!user">
        <div class="nav-button-container">
          <RouterLink to="login">
            <button class="nav-btn">Log in</button>
          </RouterLink>
        </div>
      </div>
      <div v-else class="nav_inner-right">
        <div class="nav-button-container">
          <button class="nav-btn" @click="logout">Log out</button>
        </div>
        <div
          class="nav-button-container"
          @mouseenter="isTooltipVisible = true"
          @mouseleave="isTooltipVisible = false"
        >
          <button class="nav-btn" @click="pokedexModal = true">Pokedex</button>
          <Tooltip :is-tooltip-visible="isTooltipVisible"></Tooltip>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tooltip from "../Tooltip.vue";
import { usePokemonStore, useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { RouterLink } from "vue-router";
const isTooltipVisible = ref(false);

const pokemonStore = usePokemonStore();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { pokedexModal } = storeToRefs(pokemonStore);

const logout = async () => {
  await userStore.logout();
};
</script>

<style scoped>
.nav {
  background-color: var(--secondary-color);
  opacity: 0.75;
  padding: 10px 50px;
  position: relative;
  top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 25px;
  transition: opacity ease 0.2s;
}

.nav:hover {
  opacity: 1;
  transition: opacity ease 0.2s;
}

.nav_inner {
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_inner-left {
  height: 100%;
}

.nav_inner-right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
}

.pokeball-logo {
  height: 100%;
}

.nav-button-container {
  position: relative;
  height: fit-content;
  margin-left: 10px;
}

.nav-btn {
  color: var(--secondary-color);
  text-align: center;
  background-color: var(--primary-color);
  border: 0px;
  font-size: 1.3em;
  padding: 12px 25px;
  border-radius: 12px;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;
}
</style>
