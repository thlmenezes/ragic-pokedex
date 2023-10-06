export interface Type {
  name: string
  id: string
}

export interface PokemonStats {
  hp: number,
  attack: number,
  defense: number,
  "special-attack": number,
  "special-defense": number,
  speed: number,
}

export interface PokemonInfo {
  name: string
  spriteUrl: string
  types: Type[]
  stats: PokemonStats
}

const getTypes = (
  types: { slot: number; type: { name: string; url: string } }[]
): Type[] =>
  types.map(({ type }) => ({
    name: type.name,
    id: type.url.match(/type\/(\d+)/)?.[1] ?? "-1",
  }))

const getStats = (stats: { base_stat: number, stat: { name: keyof PokemonStats } }[]): PokemonStats =>
  stats.reduce<Partial<PokemonStats>>((acc, curStat) => ({ ...acc, [curStat.stat.name]: curStat.base_stat }), {}) as PokemonStats

export const getPokemonInfo = (data: any): PokemonInfo => ({
  name: data.name[0].toUpperCase() + data.name.slice(1),
  spriteUrl: data.sprites.front_default,
  types: getTypes(data.types),
  stats: getStats(data.stats),
})

interface ApiPokemonSimplified {
  name: string
  url: string
}

export interface PokemonLink {
  id: string
  name: string
  spriteUrl: string
}

export const getPokemonLink = (data: ApiPokemonSimplified): PokemonLink => ({
  name: data.name[0].toUpperCase() + data.name.slice(1),
  id: data.url.match(/pokemon\/(\d+)/)?.[1] ?? "-1",
  spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.url.match(
    /pokemon\/(\d+)/
  )?.[1]}.png`,
})
