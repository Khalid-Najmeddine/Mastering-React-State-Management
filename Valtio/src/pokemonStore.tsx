import {proxy} from "valtio"
import {derive} from "valtio/utils"

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export const search = proxy({
  query: "",
})

const allPokemon = proxy({
  pokemon: [] as Pokemon[]
})

export const pokemon = derive({
  list: (get) => {
    const query = get(search).query.toLowerCase()
    return get(allPokemon)
      .pokemon.filter((filterPokemon) => filterPokemon.name.toLowerCase().includes(query))
      .slice(0,10)
      .sort((pokemonA,pokemonB) => pokemonA.name.localeCompare(pokemonB.name))
  }
})

fetch("/pokemon.json")
  .then((response) => response.json())
  .then((pokemon) => {allPokemon.pokemon = pokemon})