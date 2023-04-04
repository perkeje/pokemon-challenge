<script setup lang='ts'>
import Pokemon from './Pokemon.vue';
import ProgressBar from './ProgressBar.vue';
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const props = defineProps({
    isTooltipVisible: {
        type: Boolean,
        default: false
    }
})
const pokemonStore = usePokemonStore()
const { maxPokemons, pokedex, pokemonPictureUrl } = storeToRefs(pokemonStore)

let progress = ref(Math.floor(pokedex.value.size / maxPokemons.value * 100))

const lastPokemon = Array.from(pokedex.value).pop();

</script>

<template>
    <div class="tooltip" v-show="props.isTooltipVisible">
        <p>Lastly added</p>
        <div class="img-container">
            <img :src="pokemonPictureUrl + lastPokemon + '.png'" alt="Pokemon">
        </div>
        <div class="progress-container">
            <ProgressBar :progress="progress"></ProgressBar>
        </div>
    </div>
</template>

<style scoped>
.tooltip {
    border: .5px solid var(--primary-color);
    position: absolute;
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8rem;
    left: 50%;
    margin-top: 10px;
    translate: -50% 0;
}

.tooltip::before {
    content: "";
    position: absolute;
    top: -10px;
    left: calc(50% + .5px);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--primary-color) transparent;
}

.tooltip:after {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    margin-left: -5px;
    border-width: 5.5px;
    border-style: solid;
    border-color: transparent transparent var(--secondary-color) transparent;
}

.progress-container {
    width: 80%;
    height: 3%;
}

.img-container {
    height: 50%;
}

.img-container img {
    height: 100%;
}

.tooltip p {
    font-size: 1.2em;
    margin: 0;
}</style>
