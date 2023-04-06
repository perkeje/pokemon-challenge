<script setup lang='ts'>
import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

jsConfetti.addConfetti({
    confettiNumber: 1000
})

</script>

<template>
    <div class="winning-content">
        <p>You won!</p>
        <div class="img-holder">
            <img src="src/assets/images/clipart1344213.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.winning-content {
    position: relative;
    height: 100%;
}

.img-holder {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 70%;
    animation: slide-up 1.5s ease-out;
    animation-fill-mode: backwards;
}

.winning-content p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5em;
    font-weight: 250;
}

img {
    height: 100%;
}

@keyframes slide-up {
    0% {
        transform: translateY(100%) translateX(-50%);
        ;
    }

    100% {
        transform: translateY(0) translateX(-50%);
        ;
    }
}</style>
