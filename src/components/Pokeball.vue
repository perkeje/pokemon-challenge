<script setup lang="ts"></script>

<template>
  <div class="ball">
    <div class="ball__button"></div>
    <slot />
  </div>
</template>

<style>
.ball__button {
  height: 30px;
  width: 30px;
  background-color: #fff;
  border-radius: 100%;
  border-color: #333;
  border-style: solid;
  border-width: 2px;
  box-shadow:
    0 0 0 5px #fff,
    0 0 0 12px #333;
}

.ball {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image:
    -webkit-radial-gradient(
      60% 40%,
      circle,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 1) 100%
    ),
    -webkit-linear-gradient(-90deg, #d00 45%, #333 45%, #333 55%, #fff 55%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
