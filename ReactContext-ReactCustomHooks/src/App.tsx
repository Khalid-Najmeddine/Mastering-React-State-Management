import React, {useState, useEffect, createContext, useContext} from "react"

interface Pokemon {
  id: number
  name: string
  type: string[]
  hp: number
  attack: number
  defense: number
  special_defense: number
  special_attack: number
  speed: number
}

function usePokemonSource(): {pokemon: Pokemon[]} {
  const[pokemon, setPokemon] = React.useState<Pokemon[]>([])

  React.useEffect(() => {
    fetch("/pokemon.json").then((response) => response.json()).then((data) => setPokemon(data))
  }, [])

  return {pokemon}
}

const PokemonContext = React.createContext<ReturnType<typeof usePokemonSource> | undefined>(undefined)

function usePokemon() {
  return React.useContext(PokemonContext)! // ! tells typescript that usePokemon() will always return a value of PokemonContext that will never be undefined
}

function PokemonList() {
  const {pokemon} = usePokemon()

  return (
    <div>
      {pokemon.map((mapPokemon) => (
        <div key={mapPokemon.id}>{mapPokemon.name}</div>
      ))}
    </div>
  )
}

export default function App() {

  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      <PokemonList />
    </PokemonContext.Provider>
  )
}