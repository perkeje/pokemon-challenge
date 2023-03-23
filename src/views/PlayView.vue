<template>
    <div class="play-content">
        <div class="play-container">
            <div class="poke-img-holder" :style="{'-webkit-mask-image': `url(${ randomPokemonImg })`, 'mask-image': `url(${ randomPokemonImg })`}">
                <Transition name="appear">    
                    <img :src="randomPokemonImg" alt="Pokemon" v-if="isGuessed">
                </Transition>
            </div>
            <div class="guess">
                <input class="guess-input" type="text">
                <button class="guess-btn" @click="() => isGuessed = !isGuessed">Guess</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
export default {
    setup() {
        const isGuessed = ref(false)
        const pokemonStore = usePokemonStore()
        const { randomPokemonId, randomPokemonImg } = storeToRefs(pokemonStore)

        pokemonStore.getRandomPokemonIdAndPic()
        
        return { randomPokemonImg, isGuessed}
    }
}
</script>

<style scoped>
.play-content {
    position: absolute;
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

.guess {
    height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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

.appear-enter-active,
.appear-leave-active {
    transition: opacity 0.3s ease-in;
}

.appear-enter-from,
.appear-leave-to {
    opacity: 0;
}

</style>