<script setup lang="ts">
import { usePokemonStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, reactive } from "vue";
import { Select, CloseBold } from "@element-plus/icons-vue";
import Winning from "@/components/Winning.vue";
import Pokemon from "@/components/Pokemon.vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { $toast } from "@/logic/notification";

const isGuessed = ref(false);
const isCorrect = ref(false);
const pokemonStore2 = usePokemonStore();
const { randomPokemon, truePokemon, lastGuessed, percentage } =
  storeToRefs(pokemonStore2);
const isWin = ref(percentage.value == 1);

const guessFormRef = ref<FormInstance>();

const guessForm = reactive({
  userGuess: "",
});
const rules = ref<FormRules>({
  userGuess: [
    {
      required: true,
      message: "You have to guess something!",
      trigger: "blur",
    },
  ],
});
const newPokemon = async () => {
  if (percentage.value == 1) {
    isWin.value = true;
    return;
  }
  guessForm.userGuess = "";
  await pokemonStore2.fetchRandomPokemon();
  isGuessed.value = false;
};

const guess = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      await pokemonStore2.guessPokemon(
        randomPokemon.value!.id,
        guessForm.userGuess,
      );
      isCorrect.value =
        truePokemon.value?.name === guessForm.userGuess.toLocaleLowerCase();
      isGuessed.value = true;
      const pokemonName = truePokemon.value?.name;
      if (isCorrect.value && pokemonName) {
        await pokemonStore2.getPercentage();
        lastGuessed.value = truePokemon.value;
        setTimeout(() => {
          const capitalizedPokemonName =
            pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
          $toast({
            title: "Pokedex",
            message: capitalizedPokemonName + " is added to pokedex",
            type: "success",
            duration: "short",
          });
        }, 700);
      }
    }
  });
};

onMounted(() => {
  newPokemon();
});
</script>

<template>
  <div class="play-wrapper">
    <el-card class="play-content">
      <label for="guess-input" v-if="!isWin">
        <div class="play-container">
          <Pokemon
            :display="isGuessed"
            :pokemon-img="randomPokemon?.pictureUrl"
          />
          <el-form
            class="guess"
            v-if="!isGuessed"
            ref="guessFormRef"
            :rules="rules"
            :model="guessForm"
            @submit.prevent
          >
            <el-form-item prop="userGuess" class="guess-item" size="large">
              <el-input
                class="guess-input"
                v-model="guessForm.userGuess"
                autofocus
                placeholder="Who's that pokemon?"
                @keyup.enter="guess(guessFormRef)"
                size="large"
              />
            </el-form-item>
            <el-button
              class="guess-btn"
              type="primary"
              @click="guess(guessFormRef)"
              :loading="pokemonStore2.isLoading"
              size="large"
            >
              Guess
            </el-button>
          </el-form>
          <div class="next" v-if="isGuessed">
            <div class="pokemon-text">
              <p>{{ truePokemon?.name }}</p>
              <el-icon :size="40">
                <CloseBold v-if="!isCorrect" style="color: var(--error)" />
                <Select v-if="isCorrect" style="color: var(--success)" />
              </el-icon>
            </div>
            <el-button
              class="next-btn"
              type="primary"
              @click="newPokemon"
              :loading="pokemonStore2.isLoading"
              size="large"
            >
              Next
            </el-button>
          </div>
        </div>
      </label>
      <div class="winning-container" v-if="isWin">
        <Winning />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.play-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-content {
  background-color: var(--secondary-color);
  width: 100%;
  max-width: 550px;
  border-radius: 25px;
  padding: 10px 0px;
  transition: background-color ease-out 0.3s;
  border-style: hidden;
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
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
}

.guess-item {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-text p {
  animation: grow 0.8s ease-in;
  overflow: hidden;
  font-size: 1.5em;
  font-weight: 300;
  text-transform: capitalize;
  text-align: center;
}

.pokemon-text {
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 100%;
  font-size: 1.3em;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.next-btn,
.guess-btn {
  width: 80%;
  cursor: pointer;
  border: none;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1.2em;
  transition: background-color 0.3s;
  margin-bottom: 20px;
  margin-top: 20px;
}

.next-btn:hover,
.guess-btn:hover {
  background-color: #888888;
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
