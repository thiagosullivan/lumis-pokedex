import { useQuery } from "@tanstack/react-query";
import { pokeapi } from "../services/pokeapi";
import { pokemonQueryKeys } from "./queryKeys";

export const usePokemonDetails = (idOrName: string | number) => {
  return useQuery({
    queryKey: pokemonQueryKeys.detail(idOrName),
    queryFn: async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
      return pokeapi.getPokemonDetails(url);
    },
    enabled: !!idOrName,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};
