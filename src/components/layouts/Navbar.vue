<template>
    <nav class="nav">
        <div class="nav_inner">
            <div class="nav_inner-left">
                <RouterLink :to="{ name: 'home' }">
                    <img class="pokeball-logo" src="../../assets/images/logo.png" alt="pokeball">
                </RouterLink>
            </div>
            <div class="nav_inner-right">
                <RouterLink :to="{ name: 'pokedex' }">
                    <div class="pokedex-link" @mouseenter="isTooltipVisible = true" @mouseleave="isTooltipVisible = false">
                        <button class="pokedex-btn">
                            Pokedex
                        </button>
                        <Tooltip :is-tooltip-visible="isTooltipVisible"></Tooltip>
                    </div>
                </RouterLink>
            </div>
        </div>

    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tooltip from '../Tooltip.vue';
const isTooltipVisible = ref(false)

</script>

<style scoped>
.nav {
    background-color: var(--secondary-color);
    opacity: 0.9;
    padding: 10px 50px;
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 1000;
    border-radius: 25px;
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
}

.pokeball-logo {
    height: 100%;
}

.pokedex-link {
    position: relative;
    height: fit-content;
}

.pokedex-btn {
    color: var(--secondary-color);
    text-align: center;
    background-color: var(--primary-color);
    border: 0px;
    font-size: 1.3em;
    padding: 12px 25px;
    border-radius: 12px;
    cursor: pointer;
}
</style>