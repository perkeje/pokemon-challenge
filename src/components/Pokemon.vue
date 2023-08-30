<script setup lang='ts'>
const props = defineProps({
    pokemonImg: {
        type: String,
        default: '',
    },
    display: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="poke-img-holder"
        :style="{ '-webkit-mask-image': `url(${props.pokemonImg})`, 'mask-image': `url(${props.pokemonImg})` }">
        <img :src="props.pokemonImg" alt="Pokemon" v-if="display">
    </div>
</template>

<style scoped>
.poke-img-holder {
    aspect-ratio: 1/1;
    width: 70%;
    background-color: var(--background);
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    display: flex;
    justify-content: center;
}

.poke-img-holder img {
    animation: opacity 0.5s ease-in;
    overflow: hidden;
}

@keyframes opacity {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
