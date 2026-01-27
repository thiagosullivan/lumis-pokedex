export const pokemonQueryKeys = {
  all: ["pokemons"] as const,
  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  list: (filters: { search?: string; page?: number }) =>
    [...pokemonQueryKeys.lists(), filters] as const,
  details: () => [...pokemonQueryKeys.all, "detail"] as const,
  detail: (idOrName: string | number) =>
    [...pokemonQueryKeys.details(), idOrName] as const,
};
