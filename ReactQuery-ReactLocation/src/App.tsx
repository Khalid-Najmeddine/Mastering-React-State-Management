import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {PokemonProvider, usePokemon} from "./pokemonStore"
import {Link, Outlet, ReactLocation, Router, useMatch} from "@tanstack/react-location"

const queryClient = new QueryClient()
const reactlocation = new ReactLocation()

function SearchBox() {
  const {search, setSearch} = usePokemon()
  return (
    <input 
      placeholder="Search for a Pokemon inside the National Pokedex"
      className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2 "
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}

function PokemonList() {
  const {pokemon} = usePokemon()

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
      {pokemon.map((mapPokemon) => (
        <Link key={mapPokemon.id} to={`/pokemon/${mapPokemon.id}`} >
          <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
            <div className="flex-1 flex flex-col p-8">
              <img 
                className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mapPokemon.id}.png`}
                alt = ""
              />
              <h3 className="mt-6 text-gray-900 text-sm font-medium">{mapPokemon.name}</h3>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

function PokemonStatsRoutes() {
  const {params: {id}} = useMatch()
  const {pokemon} = usePokemon()
  const pokemonData = pokemon.find((findPokemon) => findPokemon.id === +id)

  if (!pokemonData) {
    return (
      <div>No Pokemon Found...</div>
    )
  }

  return (
    <div className="mt-3">
      <Link to="/">
        <h1 className="text-2xl font-bold mb-5">&lt; Home</h1>
      </Link>
      <div className="grid grid-cols-2">
        <img
          className="w-96 h-96 flex-shrink-0 mx-auto bg-black rounded-xl"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
          alt=""
        />
        <div className="ml-3">
          <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
          <div className="mt-3">
            <h3 className="text-xl font-bold">Stats</h3>
            <ul className="mt-3">
              {[
                "hp",
                "attack",
                "defense",
                "special_attack",
                "special_defense",
                "speed",
              ].map((stat) => (
                <li key={stat} className="grid grid-cols-2">
                  <span className="font-bold">{stat}</span>
                  <span>{pokemonData[stat as keyof typeof pokemonData]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const pokemonRoutes = [
  {
    path: "/",
    element: (
      <>
        <SearchBox />
        <PokemonList />
      </>
    ),
  },
  {
    path: "/pokemon/:id",
    element: <PokemonStatsRoutes />
  },
]

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Router location={reactlocation} routes={pokemonRoutes}>
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </Router>
      </PokemonProvider>
    </QueryClientProvider>
  )
}