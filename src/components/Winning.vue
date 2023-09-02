<script setup lang="ts">
import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();

jsConfetti.addConfetti({
  confettiNumber: 1000,
});
</script>

<template>
  <div class="winning-content">
    <p>Congratulations! <br />You became Pokemaster!</p>
    <div class="img-holder">
      <img src="@/assets/images/clipart1344213.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.winning-content {
  height: 100%;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img-holder {
  height: 70%;
  animation: slide-up 1.5s ease-out;
  animation-fill-mode: backwards;
}

.winning-content p {
  font-size: 2em;
  font-weight: 250;
  align-items: center;
  text-align: center;
}

img {
  height: 350px;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
