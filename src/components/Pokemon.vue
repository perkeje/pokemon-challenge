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
    height: 70%;
    width: 70%;
    background-color: black;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    display: flex;
    justify-content: center;
}
</style>
