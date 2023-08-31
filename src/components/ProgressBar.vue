<script setup lang="ts">
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="outer">
    <div class="inner" :style="{ width: `${props.progress}%` }">
      <div class="inner-animate"></div>
    </div>
  </div>
</template>

<style>
.outer {
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  border-radius: 10px;
  border-color: var(--primary-color);
  border-style: solid;
}

.inner {
  width: 0%;
  height: 100%;
  border-radius: 10px;
  border-style: hidden;
}

.inner-animate {
  height: 100%;
  background-color: #009ddc;
  border-radius: 10px;
  border-style: hidden;
  animation: progress 1s ease-out 0.2s;
  animation-fill-mode: backwards;
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>
