<script setup lang='ts'>
import { ref } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    message: {
        type: String,
        default: '',
    },
    duration: {
        type: Number,
        default: 3000,
    },
})
const visible = ref(false)
let duration = props.duration
let start: number
let remaining: number
let timer: number | undefined

const show = () => {
    visible.value = true
    start = Date.now()
    remaining = duration
    timer = setTimeout(() => {
        visible.value = false
    }, duration)
}

const onHover = () => {
    remaining -= Date.now() - start
    clearTimeout(timer)
}

const onMouseLeave = () => {
    timer = setTimeout(() => {
        visible.value = false
    }, remaining)
}

const close = () => {
    visible.value = false
}

show()
</script>

<template>
    <div v-if="visible" class="toast-container" @mouseenter="onHover" @mouseleave="onMouseLeave">
        <div class="toast-header">
            <el-icon @click="close" :size="25">
                <CircleCloseFilled />
            </el-icon>
            <p class="toast-title">{{ title }}</p>
        </div>
        <div class="toast-body">
            {{ message }}
        </div>
    </div>
</template>

<style scoped>
.toast-container {
    position: fixed;
    width: 90vw;
    /* Use 90% of viewport width */
    max-width: 350px;
    /* Set a maximum width */
    height: auto;
    /* Allow height to adjust based on content */
    top: 20%;
    right: 5%;
    opacity: 0.8;
    background-color: var(--secondary-color);
    border-radius: 0px 10px 10px 10px;
    padding: 10px;
    z-index: 100;
}

.toast-container:hover {
    opacity: 1;
}

.toast-header {
    box-sizing: border-box;
    height: 30%;
    display: flex;
    justify-content: center;
    border-bottom: 0.5px var(--primary-color) solid;
}

.toast-header p {
    margin: 5px 0px;
    font-size: 1.5em;
}

.toast-body {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.2em;
    font-weight: 200;
    height: 70%;
    padding: 15px;
}

.el-icon {
    position: absolute;
    top: 0;
    left: 0;
    translate: -30% -30%;
    color: var(--primary-color);
    cursor: pointer;
}</style>
