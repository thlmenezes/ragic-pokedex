import { usePokemonByType } from "../api/fetchPokemonByType"
import { Loading } from "../components/Loading"
import { Navbar } from "../components/Navbar"
import { PageContent } from "../components/PageContent"
import { PageTitle } from "../components/PageTitle"
import { PokeCard } from "../components/PokeCard"
import { PokelistContainer } from "../components/PokelistContainer"
import { TypeBadge } from "../components/TypeBadge"
import { Link, useRouteParams } from "../routes"

export const ListPokemonByTypePage = () => {
  const { typeId } = useRouteParams('/pokemons/types/:typeId')

  const { name, pokemon } = usePokemonByType(typeId)

  return (
    <>
      <Navbar />
      <PageContent>
        <PageTitle>
          {!name ? <Loading /> : <TypeBadge name={name!}>{name}</TypeBadge>}{" "}
          Pokemon
        </PageTitle>
        <PokelistContainer>
          {!pokemon ? (
            <Loading />
          ) : (
            pokemon.map((pokemon) => (
              <Link to="/pokemons/:pokemonId" params={{ pokemonId: pokemon.id }}>
                <PokeCard pokemon={pokemon} key={pokemon.name} />
              </Link>
            ))
          )}
        </PokelistContainer>
      </PageContent>
    </>
  )
}
