<script setup lang='ts'>
import Pokemon from '@/components/Pokemon.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Loading from '@/components/Loading.vue';
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const pokemonStore = usePokemonStore()
const { isLoading, totalPages, pokedex, maxPokemons } = storeToRefs(pokemonStore)
const currentPage = ref(1)
let pokemons = ref()
let progress = ref(Math.floor(pokedex.value.size / maxPokemons.value * 100))

const changePage = async (page: number) => {
    pokemons.value = await pokemonStore.getPokemons(page)
    currentPage.value = page
}

onMounted(async () => {
    pokemons.value = await pokemonStore.getPokemons(currentPage.value)
})

</script>

<template>
    <div class="loading" v-if="isLoading">
        <Loading></Loading>
    </div>
    <div class="pokedex-container" v-if="!isLoading">
        <div class="progress">
            <div class="progress-percentage">
                <p>{{ progress }}%</p>
            </div>
            <div class="progress-bar">
                <ProgressBar :progress=progress></ProgressBar>
            </div>
        </div>
        <div class="pokedex-grid">
            <div class="pokemon-holder" v-for="pokemon in pokemons">
                <Pokemon :pokemon-img="pokemon.img" :display="pokemon.name === '???' ? false : true" />
                <p>{{ pokemon.name }}</p>
            </div>
        </div>

        <div class="pokedex-pagination">
            <button @click="async () => await changePage(--currentPage)" :disabled="currentPage === 1">Prev</button>
            <button v-for="page in totalPages" :key="page" :class="{ active_btn: currentPage === page }"
                @click="async () => await changePage(page)">{{ page }}</button>
            <button @click="async () => await changePage(++currentPage)"
                :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<style scoped>
.loading {
    left: 50%;
    translate: -50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 50%;
    position: relative;
}

.pokedex-grid {
    display: grid;
    height: 100%;
    width: 100%;
    margin: 50px 0;
    scroll-behavior: smooth;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.pokemon-holder {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
}

.pokemon-holder p {
    text-transform: capitalize;
    font-size: 1.6em;
    font-weight: 200;
}

.pokedex-pagination {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 60px);
    align-items: center;
    grid-gap: 5px;
    margin-bottom: 30px;
}

.pokedex-pagination button {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 10px;
    border-style: hidden;
    height: 40px;
    width: 100%;
    cursor: pointer;
    font-size: 1em;
}

button:disabled {
    opacity: 0.8;
    cursor: default;
}

.active_btn {
    border-style: solid !important;
    border-color: #00FF00;
}

.progress {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.progress-bar {
    width: 50%;
    height: 20%;
}

.progress-percentage {
    font-size: 1.5em;
    font-weight: 250;
    height: 80%;
    animation: appear 0.3s ease-out 1.2s;
    animation-fill-mode: backwards;
    color: var(--primary-color);
}

@keyframes appear {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.progress-percentage p {
    margin: 0 0 5px 0;
}
</style>

