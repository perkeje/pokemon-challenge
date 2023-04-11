<script setup lang='ts'>
import { Sunny, Moon } from '@element-plus/icons-vue';
import { usePokemonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

const { theme } = storeToRefs(usePokemonStore())

const changeTheme = () => {
    if (theme.value === 'light') theme.value = 'dark'
    else theme.value = 'light'
}

const updateThemeClass = () => {
    const htmlElement = document.documentElement;
    if (theme.value === 'dark') {
        htmlElement.classList.add('dark-theme');
    } else {
        htmlElement.classList.remove('dark-theme');
    }
};

onMounted(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
    }
    else {
        theme.value = 'light'
    }
    updateThemeClass();
});

watch(theme, () => {
    updateThemeClass();
});
</script>

<template>
    <div class="theme-btn-container">
        <button class="theme-btn" @click="changeTheme">
            <el-icon :size="30">
                <Moon v-if="theme === 'light'" />
                <Sunny v-else />
            </el-icon>
        </button>
    </div>
</template>

<style>
.theme-btn-container {
    position: fixed;
    bottom: 10%;
    right: 5%;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    z-index: 1000;
    border-style: hidden;
}

.theme-btn {
    height: 100%;
    width: 100%;
    background-color: var(--primary-color);
    cursor: pointer;
    border-radius: 100%;
    border-style: hidden;
}

.el-icon {
    color: var(--secondary-color);
}
</style>
