import React, {useState, useEffect, createContext, useContext, useReducer, useCallback, useMemo} from "react"

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

function usePokemonSource(): {pokemon: Pokemon[]; search: string, setSearch: (search: string) => void} {
  // const [pokemon, setPokemon] = React.useState<Pokemon[]>([])
  // const [search, setSearch] = React.useState("")
  type PokemonState = {
    pokemon: Pokemon[]
    search: string
  }

  type PokemonAction = 
    | {type: "setPokemon"; payload: Pokemon[]} 
    | {type: "setSearch"; payload: string}

  const [{pokemon, search}, dispatch] = React.useReducer((state: PokemonState, action: PokemonAction) => {
    switch (action.type) { 
      case "setPokemon": return {...state, pokemon: action.payload}
      case "setSearch": return {...state, search: action.payload}
    }
  }, 
    {
      pokemon: [],
      search: "",
    }
  )
    
  React.useEffect(() => {
    fetch("/pokemon.json").then((response) => response.json()).then((data) => dispatch({type: "setPokemon", payload: data}))
  }, [])

  const setSearch = React.useCallback((search: string) => {
    dispatch({type: "setSearch", payload: search})
  }, [])

  const filteredPokemon = React.useMemo(() => 
    pokemon.filter((filterPokemon) => filterPokemon.name.toLowerCase().includes(search)).slice(0,20), [pokemon, search])

  const sortedPokemon = React.useMemo(() => 
    [...filteredPokemon].sort((pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name)), [filteredPokemon])

  return {pokemon: sortedPokemon, search, setSearch}
}

const PokemonContext = React.createContext<ReturnType<typeof usePokemonSource> | undefined>(undefined)

export function usePokemon() {
  return React.useContext(PokemonContext)! // ! tells typescript that usePokemon() will always return a value of PokemonContext that will never be undefined
}

export function PokemonProvider({children}: {children: React.ReactNode}) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  )
}