<script setup lang='ts'>

</script>

<template>
    <div class="not-found-container">
        <h1>404 - Not Found</h1>
        <p>Uh-oh! It looks like this page is as elusive as a wild Mew.</p>
        <p>Return to the <router-link :to="{ name: 'home' }">Pokécenter</router-link> and start your journey again.</p>
    </div>
</template>

<style scoped>
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 1.8em;
    text-align: center;
    background-image: url('src/assets/images/surprised-pikachu.gif');
}

.not-found-container a {
    color: #F6CF57;
    text-decoration: none;
}
</style>
