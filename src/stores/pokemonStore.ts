import { defineStore } from "pinia";
import { $axios } from "../modules/axios"; // Assuming you have an Axios module
import { ref } from "vue";
import { $toast } from "@/logic/notification";

interface RandomPokemon {
  id: number;
  pictureUrl: string;
}
interface TruePokemon {
  id: number;
  name: string;
  pictureUrl: string;
}

interface Pokedex {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: Array<TruePokemon>;
}
export const usePokemonStore = defineStore("pokemon", () => {
  const randomPokemon = ref<RandomPokemon | undefined>(undefined);
  const truePokemon = ref<TruePokemon | undefined>(undefined);
  const lastGuessed = ref<TruePokemon | undefined>(undefined);
  const percentage = ref<number>(0);
  const pokedex = ref<Pokedex | undefined>(undefined);
  const isLoading = ref(false);
  const isError = ref(false);

  async function fetchRandomPokemon() {
    isLoading.value = true;
    await $axios
      .get("/users/pokemons/random")
      .then(async (response) => {
        randomPokemon.value = response.data;
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message:
            error?.response?.data?.cause || "Getting random pokemon error",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function guessPokemon(id: number, name: string) {
    isLoading.value = true;
    await $axios
      .post("/users/pokemons/guess", {
        id: id,
        name: name,
      })
      .then(async (response) => {
        truePokemon.value = response.data;
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message:
            error?.response?.data?.cause || "Getting random pokemon error",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function getLastGuessed() {
    isLoading.value = true;
    await $axios
      .get("/users/pokemons/last")
      .then(async (response) => {
        lastGuessed.value = {
          id: response.data?.id,
          name: response.data?.name,
          pictureUrl: response.data?.pictureUrl,
        };
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message:
            error?.response?.data?.cause ||
            "Error getting last guessed pokemon",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function getPokedex(page: number) {
    isLoading.value = true;
    isError.value = false;
    await $axios
      .get("/users/pokemons?page=" + page + "&perPage=12")
      .then(async (response) => {
        pokedex.value = response.data;
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message:
            error?.response?.data?.cause || "Error when fetching pokedex",
          type: "error",
          duration: "long",
        });
        isError.value = true;
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function getPercentage() {
    isLoading.value = true;
    await $axios
      .get("/users/pokemons/percentage")
      .then(async (response) => {
        percentage.value = response.data;
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message: error?.response?.data?.cause || "Error getting percentage",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  return {
    randomPokemon,
    truePokemon,
    isLoading,
    fetchRandomPokemon,
    guessPokemon,
    getPercentage,
    getLastGuessed,
    lastGuessed,
    percentage,
    getPokedex,
    pokedex,
    isError,
  };
});
