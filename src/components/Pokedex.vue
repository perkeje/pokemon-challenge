<script setup lang="ts">
import Pokemon from "@/components/Pokemon.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Loading from "@/components/Loading.vue";
import { usePokemonStore2 } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import Error from "@/components/Error.vue";

const pokemonStore = usePokemonStore2();
const { isLoading, pokedex, percentage, isError } = storeToRefs(pokemonStore);

const currentPage = ref(1);
let progress = ref(Math.floor(percentage.value * 100));

const changePage = async (page: number) => {
  isError.value = false;
  await pokemonStore.getPokedex(page);
  currentPage.value = page;
};

onMounted(async () => {
  await pokemonStore.getPokedex(1);
});
</script>

<template>
  <div class="pokedex-container" v-if="!isError">
    <div class="progress">
      <div class="progress-percentage">
        <p>{{ progress }}%</p>
      </div>
      <div class="progress-bar">
        <ProgressBar :progress="progress"></ProgressBar>
      </div>
    </div>
    <div class="pokedex-grid">
      <div
        class="pokemon-holder"
        :class="{ load: isLoading }"
        v-for="pokemon in pokedex?.data"
      >
        <Pokemon
          :pokemon-img="pokemon.pictureUrl"
          :display="pokemon.name != undefined"
          v-if="!isLoading"
        />
        <p v-if="!isLoading">{{ pokemon.name ? pokemon.name : "???" }}</p>
      </div>
    </div>

    <div class="pokedex-pagination">
      <button
        @click="async () => await changePage(--currentPage)"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <button
        v-for="page in pokedex?.lastPage"
        :key="page"
        :class="{ active_btn: currentPage === page }"
        @click="async () => await changePage(page)"
      >
        {{ page }}
      </button>
      <button
        @click="async () => await changePage(++currentPage)"
        :disabled="currentPage === pokedex?.lastPage"
      >
        Next
      </button>
    </div>
  </div>
  <div class="error-container" v-else>
    <Error :handle-click="async () => await changePage(currentPage)" />
  </div>
</template>

<style scoped>
.load {
  position: relative;
  background-color: var(--shadow-color);
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 12px var(--shadow-color);
}

.load::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    var(--skeleton-animation-color),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
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
  border-color: #00ff00;
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
