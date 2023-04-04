<template>
    <div class="home-wrapper">
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
</template>

<style>
.home-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pokemon-title {
    width: 500px;
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

.ball {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-image: -webkit-radial-gradient(60% 40%, circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%),
        -webkit-linear-gradient(-90deg, #D00 45%, #333 45%, #333 55%, #FFF 55%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ball_text {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    height: 0%;
    transition: height 0.2s ease-in;
}

.ball_text_img {
    height: 100%;
}

.ball:hover {
    animation: shake .3s;
    animation-iteration-count: infinite;
}

.ball:hover>.ball_text {
    height: 50%;
    transition: height 0.4s ease-in;
}

.ball:hover>.ball_text {
    height: 50%;
    transition: height 0.4s ease-in;
}

@keyframes shake {

    0%,
    100% {
        rotate: -10deg;
    }

    50% {
        rotate: 10deg;
    }
}
</style>