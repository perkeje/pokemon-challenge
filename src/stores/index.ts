import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


type PokemonState = {
  maxPokemons: number,
  pokemonApiUrl: string
  pokemonPictureUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork',
  pokedex: Set<number>
}

export const usePokemonStore = defineStore('pokemon', {
  state: ():PokemonState => ({
    maxPokemons: 151,
    pokemonApiUrl: ' https://pokeapi.co/api/v2/pokemon/',
    pokemonPictureUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork',
    pokedex: new Set<number>()
  }),
  actions: {
    getRandomPokemonId() {
      let id:number
      do{
        id = Math.floor(Math.random() * this.maxPokemons) + 1
      }while(this.pokedex.has(id))
      return id
    },
    async getPokemonName(id: number) {
      try{
        const request = await fetch(this.pokemonApiUrl + id)
        const response = await request.json()
        const pokemon = response.forms[0].name
        return pokemon
      }catch{
        
      }
    },
    storeToPokedex(id:number) {
      this.pokedex.add(id)
    }
  }
})
