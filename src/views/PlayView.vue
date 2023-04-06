<template>
    <div class="play-wrapper">
        <div class="play-content">
            <Toast v-if="isCorrect && !isGuessed" title="Correct!" :message="pokemon.toUpperCase() + ' added to Pokedex'"
                :duration="3000" />
            <label for="guess-input" v-if="!isWin">
                <div class="play-container">
                    <div class="poke-img-holder"
                        :style="{ '-webkit-mask-image': `url(${randomPokemonImg})`, 'mask-image': `url(${randomPokemonImg})` }">
                        <img :src="randomPokemonImg" alt="Pokemon" v-if="isGuessed">
                    </div>
                    <div class="guess" v-if="!isGuessed">
                        <input class="guess-input" id="guess-input" type="text" @keydown.enter="guess" v-model="userGuess"
                            placeholder="Who's that pokemon?">
                        <button class="guess-btn" @click="guess">Guess</button>
                    </div>
                    <div class="next" v-if="isGuessed">
                        <div class="pokemon-text">
                            <div v-if="isLoading">Loading...</div>
                            <p v-else>{{ pokemon }}</p>
                            <el-icon :size="40">
                                <CloseBold v-if="!isCorrect" style="color: var(--error)" />
                                <Select v-if="isCorrect" style="color: var(--success)" />
                            </el-icon>
                        </div>
                        <button class="next-btn" @click="newPokemon">Next</button>
                    </div>
                </div>
            </label>
            <div class="winning-container" v-else>
                <Winning />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Select, CloseBold } from '@element-plus/icons-vue'
import Toast from '@/components/Toast.vue';
import Winning from '@/components/Winning.vue';

const isGuessed = ref(false)
const userGuess = ref("")
const isCorrect = ref(false)
const randomPokemonImg = ref("")
const pokemonStore = usePokemonStore()
const { pokemonPictureUrl, isLoading, pokedex, maxPokemons } = storeToRefs(pokemonStore)
const pokemon = ref("")
const isWin = ref(false)
let id = 0

const newPokemon = () => {
    if (checkPokedex()) return
    isGuessed.value = false
    id = pokemonStore.getRandomPokemonId()
    randomPokemonImg.value = `${pokemonPictureUrl.value}${id}.png`
}
const checkPokedex = () => {
    if (pokedex.value.size >= maxPokemons.value) isWin.value = true
    return isWin.value
}
const guess = async () => {
    if (userGuess.value === "") {
        alert("You have to enter Pokemon name");
        return
    }
    if (!isGuessed) return

    pokemon.value = await pokemonStore.getPokemonName(id);
    isGuessed.value = !isGuessed.value

    if (pokemon?.value != undefined) {
        if (pokemon?.value === userGuess.value.toLowerCase()) {
            isCorrect.value = true
            pokemonStore.storeToPokedex(id)
        }
        else {
            isCorrect.value = false
        }
    }
    userGuess.value = ""
}
newPokemon()


</script>

<style scoped>
.play-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.play-content {
    background-color: var(--secondary-color);
    height: 500px;
    width: 500px;
    border-radius: 25px;
    padding: 10px 0px;
}

.play-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}

.poke-img-holder {
    height: 70%;
    width: 70%;
    background-color: black;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    display: flex;
    justify-content: center;
}

.guess,
.next {
    height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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

.poke-img-holder img {
    animation: opacity 0.5s ease-in;
    overflow: hidden;
}

@keyframes opacity {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
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
</style>