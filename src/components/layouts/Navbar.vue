<template>
  <nav class="nav">
    <div class="burger-menu" @click="toggleMenu">
      <el-icon :size="40">
        <Burger :style="{ color: 'var(--primary-color)' }" />
      </el-icon>
    </div>
    <div class="nav_inner" :class="{ open: isMenuOpen }" :style="navInnerStyle">
      <div class="nav_inner-left">
        <RouterLink :to="{ name: 'home' }">
          <img
            class="pokeball-logo"
            src="@/assets/images/logo.png"
            alt="pokeball"
          />
        </RouterLink>
      </div>
      <div class="nav_inner-right">
        <div class="nav-button-container" v-if="!user">
          <RouterLink to="login">
            <button class="nav-btn">Log in</button>
          </RouterLink>
        </div>
        <div
          class="nav-button-container"
          @mouseenter="isTooltipVisible = true"
          @mouseleave="isTooltipVisible = false"
          v-if="user"
        >
          <button class="nav-btn" @click="pokedexModal = true">Pokedex</button>
          <Tooltip
            :is-tooltip-visible="isTooltipVisible"
            class="tooltip"
          ></Tooltip>
        </div>
        <div class="nav-button-container" v-if="user">
          <button class="nav-btn" @click="logout">Log out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Burger } from "@element-plus/icons-vue";
import Tooltip from "../Tooltip.vue";
import { useAppStore, useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, ref, watchEffect } from "vue";
import {
  useRouter,
  type RouteLocationNormalized,
  type RouterLink,
} from "vue-router";

const isMenuOpen = ref(false);
const isTooltipVisible = ref(false);
const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { pokedexModal } = storeToRefs(appStore);

const logout = async () => {
  await userStore.logout();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close the navbar when the route changes
watchEffect(() => {
  const handleRouteChange = (to: RouteLocationNormalized) => {
    if (to.path !== "/") {
      // Close the navbar when navigating to a new route (excluding the homepage)
      isMenuOpen.value = false;
    }
  };

  router.afterEach(handleRouteChange);
});

const navInnerStyle = computed(() => {
  const heightTransitionDelay = isMenuOpen.value ? 0 : 0.1;
  const opacityTransitionDelay = isMenuOpen.value ? 0.1 : 0;

  return {
    transition: `height 0.2s ease-in-out ${heightTransitionDelay}s, opacity 0.2s ease-in-out ${opacityTransitionDelay}s`,
  };
});
</script>

<style scoped>
.nav {
  background-color: var(--secondary-color);
  opacity: 0.75;
  padding: 10px 3%;
  position: relative;
  top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 25px;
  transition:
    opacity ease-out 0.3s,
    background-color ease-out 0.3s;
    z-index: 1;
}

.nav:hover {
  opacity: 1;
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
  height: 60px;
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

.burger-menu {
  display: none; /* Initially hide the burger menu */
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
}

@media (max-width: 768px) {
  .nav {
    justify-content: center;
  }
  .burger-menu {
    display: flex;
    align-items: center;
  }

  .nav_inner {
    height: 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }

  .nav_inner.open {
    opacity: 1;
    height: 200px;
    pointer-events: auto;
  }
  .nav_inner-right {
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }
  .nav-button-container {
    display: flex;
    justify-content: center;
    margin: 10px;
    width: 100%;
  }
  .nav-button-container a {
    width: 100%;
  }
  .nav-btn {
    width: 100%;
  }
  .tooltip {
    display: none;
  }
}
</style>
