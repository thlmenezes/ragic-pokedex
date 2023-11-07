import { UseRoutes, createRoutes, path } from "ragic"
import { HomePage } from "./pages/HomePage"
import { ListAllPokemonPage } from "./pages/ListAll"
import { ListPokemonByTypePage } from "./pages/ListByType"
import { ShowPokemonPage } from "./pages/ShowPokemon"

const routes = createRoutes()
	.path("/", { component: HomePage })
	// .path("/home", { link_to: '/' }) NÃO FUNCIONOU COMIGO
	.path("/pokemons", {
		component: ListAllPokemonPage,
		children: path("/:pokemonId", {
			component: () => <ShowPokemonPage />
		}).path("/types", {
			children: path("/:typeId", { component: ListPokemonByTypePage }),
		})
	})

export const { Link, Router, useRouteParams } = UseRoutes(routes)
