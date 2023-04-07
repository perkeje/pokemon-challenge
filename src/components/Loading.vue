<script setup lang='ts'>
import Pokeball from './Pokeball.vue';
</script>

<template>
    <Pokeball class="ball">
        <div class="loading-text">
            <p>Loading...</p>
        </div>
    </Pokeball>
</template>

<style scoped>
.ball {
    animation: jummping 3s;
    animation-iteration-count: infinite;
}

@keyframes jummping {

     25%{
        top: 30%;
        left: -80%;
        rotate: 0deg;
        animation-timing-function: ease-out;
    }

    0%,
    50%,100%{
        top: -25%;
        left: 0%;
        rotate: 360deg;
        animation-timing-function: ease-in;
    }

    75% {
        top: 30%;
        left: 80%;
        rotate: 720deg;
        animation-timing-function: ease-out;
    }
}
.loading-text{
    position: absolute;
    top: 55%;
}
.loading-text p{
    font-size: 1.5em;
    color: black;
}
</style>
