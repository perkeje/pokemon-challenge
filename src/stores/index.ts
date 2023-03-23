import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type PokemonState = {
  randomPokemonId?: number,
  randomPokemonImg?: string,
  maxPokemons: number
}

export const usePokemonStore = defineStore('pokemon', {
  state: ():PokemonState => ({
    randomPokemonId: undefined,
    randomPokemonImg: undefined,
    maxPokemons: 151
  }),
  actions: {
    getRandomPokemonIdAndPic() {
      const id = Math.floor(Math.random() * this.maxPokemons) + 1
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      this.randomPokemonId = id
      this.randomPokemonImg = img
    }
  }
})
