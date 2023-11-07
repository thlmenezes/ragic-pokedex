import { FC } from "react"
import { usePokemon } from "../api/fetchPokemonInfo"
import { Loading } from "../components/Loading"
import { Navbar } from "../components/Navbar"
import { PageContent } from "../components/PageContent"
import { PageTitle } from "../components/PageTitle"
import { PokeInfoCard } from "../components/PokeInfoCard"
import { useRouteParams } from "../routes"

export const ShowPokemonPage: FC = () => {
  const { pokemonId } = useRouteParams('/pokemons/:pokemonId')

  const pokemon = usePokemon(pokemonId)

  return (
    <>
      <Navbar />
      <PageContent>
        {!pokemon ? (
          <Loading />
        ) : (
          <>
            <PageTitle>Showing {pokemon.name}</PageTitle>
            <PokeInfoCard pokemon={pokemon} />
          </>
        )}
      </PageContent>
    </>
  )
}
