In this challenge you will create a Pokemon-themed guessing game.

The core functionality of this challenge relies heavily on [PokeAPI](https://pokeapi.co/), so kudos to the fine folks who maintain it!

## The challenge

The challenge consists of two main parts - the "Guess that pokemon!" game and the pokedex. Together, they feature some of the most common technical challenges of both web application development and web development in general (handling API calls, data manipulation, state synchronisation, responsive design), but on a smaller scale.

### Guess that pokemon!

The guessing game consists of a random pokemon image, the guess submission form, the pokedex button, and a progress bar displaying the number of guessed pokemon to total pokemon in the game.

At the start of each round a random pokemon is fetched with an API call (provided for free by [PokeAPI](https://pokeapi.co/)). The pokemon's sprite (image) is displayed to the user and the user is prompted to guess the pokemon's name. A correct guess stores the pokemon to the user's pokedex, and an incorrect guess starts the game again by fetching a new random pokemon.

The game should follow these rules:

- Only 1st generation pokemon must be used in the game (the first 151 pokemon)
- Pokemon stored in the pokedex must not appear in the guessing game again (if the user guessed the pokemon correctly, that same pokemon won't appear in the game again)
- Every time a pokemon is guessed correctly the pokedex' progress bar is updated

### Pokedex

At any point during the game the user can open his or her pokedex in a popup. The pokedex contains a list of all pokemon in the game.

Pokemon the user has guessed are displayed with their sprite. Pokemon the user hasn't guessed are displayed with a question mark.

The list of pokemon is ordered by their ID.

The number of guessed pokemon is displayed along with the total number of pokemon in the game.

By clicking on a known (guessed) pokemon in the list the pokemon's details are shown. The detail view of the pokemon displays the pokemon's sprite, name, ID, and four stats: HP, speed, attack, defense.

### Rules

- use the latest version of Vue (Vue 3) or Nuxt
- the use of latest ECMAScript standard features
- write your styles with CSS, not Tailwind or something similar
- make sure the product is also usable and nice looking on mobile devices
- a feeling for UX and microinteractions
- investigate and use [nuxt modules](https://github.com/nuxt-community/awesome-nuxt) that can be helpful

### Additional points

- make theme switcher (light-dark)
- use important concepts: computed properties, watchers, global components, props, vuex actions, mutations, getters
- use nuxt pwa module
- implement few arbitrarily features (filters by name, filter by pokemon type, adding pokemon to favorites...)
- implement registration with Firebase Authentication
- implement login with Firebase Authentication
- keep in mind our official [guidelines](https://confluence.barrage.net/display/BD/Guidelines) and [stack](https://confluence.barrage.net/display/BD/Framework+and+Stack)
