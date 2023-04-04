import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


type PokemonState = {
  maxPokemons: number,
  totalPages: number,
  isLoading: boolean,
  pokemonApiUrl: string
  pokemonPictureUrl: string,
  pokedex: Set<number>
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    maxPokemons: 151,
    totalPages: Math.floor(151 / 20) + 1,
    isLoading: true,
    pokemonApiUrl: 'https://pokeapi.co/api/v2/pokemon/',
    pokemonPictureUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
    pokedex: new Set<number>()
  }),
  actions: {
    getRandomPokemonId() {
      let id: number
      do {
        id = Math.floor(Math.random() * this.maxPokemons) + 1
      } while (this.pokedex.has(id))
      return id
    },
    async getPokemonName(id: number) {
      try {
        this.isLoading = true
        const request = await fetch(this.pokemonApiUrl + id)
        const response = await request.json()
        const pokemon = response.forms[0].name
        this.isLoading = false
        return pokemon
      } catch {

      }
    },
    storeToPokedex(id: number) {
      this.pokedex.add(id)
    },
    async getPokemons(page: number) {
      this.isLoading = true
      let pokemons = []
      let end
      let start
      if (page == this.totalPages) {
        end = this.maxPokemons
        start = end - this.maxPokemons % 20 + 1
        console.log(start);

      }
      else {
        end = page * 20
        start = end - 19
      }
      for (let i = start; i <= end; i++) {
        let name = "???"
        if (this.pokedex.has(i)) {
          name = await this.getPokemonName(i)
        }
        pokemons.push({
          id: i,
          name,
          img: `${this.pokemonPictureUrl}${i}.png`
        })
      }
      this.isLoading = false
      return pokemons
    }
  }
})
