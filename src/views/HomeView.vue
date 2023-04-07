<script setup lang="ts">
import Pokeball from '@/components/Pokeball.vue';
</script>

<template>
    <div class="home-wrapper">
        <div class="home-content">
            <div class="title-container">
                <img class="pokemon-title" src="../assets/images/pokemon-text.png" alt="Pokemon">
            </div>
            <Router-link to="/play" class="ball__link">
                <Pokeball class="ball">
                    <div class="ball_text">
                        <img class="ball_text_img" src="src/assets/images/pngaaa.com-1906169.png" alt="GUESS THAT POKEMON">
                    </div>
                </Pokeball>
            </Router-link>
        </div>
    </div>
</template>

<style scoped>
.home-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pokemon-title {
    width: 100%;
    max-width: 500px;
}

.ball_text {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    height: 0%;
    transition: height 0.2s ease-in;
}

.ball_text_img {
    height: 100%;
}


.ball:hover>.ball_text {
    height: 50%;
    transition: height 0.4s ease-in;
}

.ball:hover>.ball_text {
    height: 50%;
    transition: height 0.4s ease-in;
}

.ball:hover {
    animation: shake .3s;
    animation-iteration-count: infinite;
}


@keyframes shake {

    0%,
    100% {
        rotate: -10deg;
    }

    50% {
        rotate: 10deg;
    }
}
</style>