import { defineStore } from 'pinia'


type PokemonState = {
  maxPokemons: number,
  totalPages: number,
  isLoading: boolean,
  pokemonApiUrl: string
  pokemonPictureUrl: string,
  pokedex: Set<number>,
  pokedexModal: boolean,
  theme: string
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    maxPokemons: 151,
    totalPages: Math.floor(151 / 20) + 1,
    isLoading: false,
    pokemonApiUrl: 'https://pokeapi.co/api/v2/pokemon/',
    pokemonPictureUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
    pokedex: new Set<number>(),
    pokedexModal: false,
    theme: 'light'
  }),
  getters: {
    getLastAdded: (state) => (Array.from(state.pokedex).pop()),
    progress: (state) => Math.floor(state.pokedex.size / state.maxPokemons * 100)
  },
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
        const request = await fetch(this.pokemonApiUrl + id)
        const response = await request.json()
        const pokemon = response.forms[0].name
        return pokemon
      } catch (error) {
        throw error
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
          try {

            name = await this.getPokemonName(i)
          } catch (error) {
            throw error
          }
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
