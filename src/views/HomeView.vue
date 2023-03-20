<template>
    <div class="home-wrapper">
        <div class="home-inner">
            <div class="home-content">
                <div class="title-container">
                    <img class="pokemon-title" src="../assets/images/pokemon-text.png" alt="Pokemon">
                </div>
                <Router-link to="/play" class="ball__link">
                    <div class="ball">
                        <div class="ball__button"></div>
                        <div class="ball_text">
                            <img class="ball_text_img" src="src/assets/images/pngaaa.com-1906169.png" alt="GUESS THAT POKEMON">
                        </div>
                    </div>
                </Router-link>
            </div>
        </div>
    </div>
</template>

<style>
.home-wrapper {
    background-repeat: no-repeat;
    background-image: url('../assets/images/Pokémon-wallpapers-5.jpg');
    background-size: cover;
    background-position: 50%;
    height: 100vh;
    width: 100%;
}

.home-inner {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pokemon-title {
    width: 500px;
}

.ball {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-image: -webkit-radial-gradient(60% 40%, circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
        -webkit-linear-gradient(-90deg, #D00 45%, #333 45%, #333 55%, #FFF 55%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ball__button {
    height: 30px;
    width: 30px;
    background-color: #FFF;
    border-radius: 100%;
    border-color: #333;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 5px #fff, 0 0 0 12px #333;
}

.ball_text {
    position: absolute;
    visibility: hidden;
    height: 0%;
}
.ball_text_img{
    height: 100%;
}
.ball:hover{
    animation: shake .3s;
    animation-iteration-count: infinite;
}
.ball:hover > .ball_text {
    visibility: visible;
    transition: height 0.4s ease-in;
    height: 75%;
}
@keyframes shake {
    0%, 100% {
        rotate: -10deg;
    }
    50% {
        rotate: 10deg;
    }
}
</style>