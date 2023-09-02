<script setup lang="ts">
import ProgressBar from "./ProgressBar.vue";
import { usePokemonStore2 } from "@/stores";
import { storeToRefs } from "pinia";

const props = defineProps({
  isTooltipVisible: {
    type: Boolean,
    default: false,
  },
});
const pokemonStore = usePokemonStore2();
const { percentage, lastGuessed } = storeToRefs(pokemonStore);
</script>

<template>
  <div class="tooltip" v-show="props.isTooltipVisible">
    <div class="display" v-if="percentage > 0">
      <p>Lastly guessed</p>
      <div class="img-container">
        <img :src="lastGuessed?.pictureUrl" alt="Pokemon" />
      </div>
      <div class="progress-container">
        <ProgressBar :progress="Math.floor(percentage * 100)"></ProgressBar>
      </div>
    </div>
    <div class="no-pokemons" v-else>
      <p>You don't have any Pokemons guessed yet!</p>
      <p>Here will be displayed your last guessed Pokemon.</p>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  border: 0.5px solid var(--primary-color);
  position: absolute;
  height: 200px;
  width: 200px;
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
  left: calc(50% + 0.5px);
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

.display {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
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
}

.no-pokemons {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.no-pokemons p {
  text-align: center;
}
</style>
