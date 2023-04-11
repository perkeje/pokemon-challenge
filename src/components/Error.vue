<script setup lang='ts'>
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
const props = defineProps({
    handleClick: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="error-content">
        <h1>Oops! An Error Occurred</h1>
        <p>It seems like Team Rocket is causing trouble again! We couldn't fetch the Pokémon information.</p>
        <button @click="props.handleClick">Retry</button>
    </div>
</template>

<style scoped>
.error-content {
    text-align: center;
    padding: 10%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}

.error-container button {
    background-color: var(--primary-color);
    border: none;
    color: var(--secondary-color);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
    border-radius: 4px;
}
</style>
