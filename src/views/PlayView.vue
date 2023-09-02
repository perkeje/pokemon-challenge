<script setup lang="ts">
import { usePokemonStore, usePokemonStore2 } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Select, CloseBold } from "@element-plus/icons-vue";
import Toast from "@/components/Toast.vue";
import Winning from "@/components/Winning.vue";
import Pokemon from "@/components/Pokemon.vue";
import Error from "@/components/Error.vue";

const isGuessed = ref(false);
const userGuess = ref("");
const isError = ref(false);
const isCorrect = ref(false);
const randomPokemonImg = ref("");
const pokemonStore = usePokemonStore();
const pokemonStore2 = usePokemonStore2();
const { pokemonPictureUrl, pokedex, maxPokemons } = storeToRefs(pokemonStore);
const { randomPokemon } = storeToRefs(pokemonStore2);
const pokemon = ref("");
const isWin = ref(false);
let id = 0;

const newPokemon = () => {
  isError.value = false;
  if (checkPokedex()) return;
  isGuessed.value = false;
  id = pokemonStore.getRandomPokemonId();
  randomPokemonImg.value = `${pokemonPictureUrl.value}${id}.png`;
};
const checkPokedex = () => {
  if (pokedex.value.size >= maxPokemons.value) isWin.value = true;
  return isWin.value;
};
const guess = async () => {
  if (userGuess.value === "") {
    alert("You have to enter Pokemon name");
    return;
  }
  if (!isGuessed) return;
  try {
    pokemon.value = await pokemonStore.getPokemonName(id);

    isGuessed.value = !isGuessed.value;

    if (pokemon?.value != undefined) {
      if (pokemon?.value === userGuess.value.toLowerCase()) {
        isCorrect.value = true;
        pokemonStore.storeToPokedex(id);
      } else {
        isCorrect.value = false;
      }
    }
    userGuess.value = "";
  } catch {
    isError.value = true;
  }
};
onMounted(() => {
  newPokemon();
});
</script>

<template>
  <div class="play-wrapper">
    <div class="play-content">
      <Toast
        v-if="isCorrect && !isGuessed"
        title="Correct!"
        :message="pokemon.toUpperCase() + ' added to Pokedex'"
        :duration="3000"
      />
      <label for="guess-input" v-if="!isWin && !isError">
        <div class="play-container">
          <Pokemon :display="isGuessed" :pokemon-img="randomPokemonImg" />
          <div class="guess" v-if="!isGuessed">
            <input
              class="guess-input"
              id="guess-input"
              type="text"
              @keydown.enter="guess"
              v-model="userGuess"
              placeholder="Who's that pokemon?"
            />
            <button class="guess-btn" @click="guess">Guess</button>
          </div>
          <div class="next" v-if="isGuessed">
            <div class="pokemon-text">
              <p>{{ pokemon }}</p>
              <el-icon :size="40">
                <CloseBold v-if="!isCorrect" style="color: var(--error)" />
                <Select v-if="isCorrect" style="color: var(--success)" />
              </el-icon>
            </div>
            <button class="next-btn" @click="newPokemon">Next</button>
          </div>
        </div>
      </label>
      <div class="winning-container" v-if="isWin && !isError">
        <Winning />
      </div>
      <div class="error-container" v-if="!isWin && isError">
        <Error :handle-click="newPokemon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.play-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-content {
  background-color: var(--secondary-color);
  /* height: 100%; */
  width: 100%;
  max-width: 500px;
  border-radius: 25px;
  padding: 10px 0px;
  transition: background-color ease-out 0.3s;
}

.play-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.guess,
.next {
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: var(--primary-color);
}

.pokemon-text p {
  animation: grow 0.8s ease-in;
  overflow: hidden;
  font-size: 2em;
  font-weight: 300;
  text-transform: capitalize;
  text-align: center;
  height: 100%;
}

.pokemon-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
}

.el-icon {
  height: 100%;
  align-items: end;
  animation: opacity 0.5s ease-in 0.8s;
  overflow: hidden;
  animation-fill-mode: backwards;
}

@keyframes grow {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.guess-input {
  height: 30%;
  width: 40%;
  border-color: var(--primary-color);
  border-radius: 15px;
  border-width: 0.5px;
  font-size: 1.3em;
  text-align: center;
}

.guess-input:focus {
  outline: none;
  border-color: var(--primary-color);
  border-width: 1.5px;
}

.next-btn,
.guess-btn {
  height: 30%;
  width: 30%;
  border-radius: 15px;
  cursor: pointer;
  border-width: 0.5px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1.3em;
}

.winning-container {
  height: 100%;
  width: 100%;
}

@keyframes opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
