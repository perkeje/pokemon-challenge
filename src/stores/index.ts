import { defineStore } from "pinia";

export * from "./userStore";
export * from "./pokemonStore";

type AppState = {
  pokedexModal: boolean;
  theme: string;
};

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    pokedexModal: false,
    theme: "light",
  }),
});
