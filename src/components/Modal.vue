<script setup lang="ts">
import { useAppStore } from "@/stores";
import { storeToRefs } from "pinia";
import { Close } from "@element-plus/icons-vue";

const { pokedexModal } = storeToRefs(useAppStore());
</script>

<template>
  <div
    v-if="pokedexModal"
    class="modal-overlay"
    @click.self="pokedexModal = false"
  >
    <div class="modal">
      <button class="modal-close" @click="pokedexModal = false">
        <el-icon :size="25">
          <Close :style="{ color: 'var(--primary-color)' }" />
        </el-icon>
      </button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal {
  background-color: var(--secondary-color);
  padding: 10px;
  border-radius: 25px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 80%;
  position: relative;
  transition: background-color ease-out 0.3s;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-content {
  height: 100%;
  margin: 10px 0px;
  width: 100%;
  overflow: scroll;
}
</style>
