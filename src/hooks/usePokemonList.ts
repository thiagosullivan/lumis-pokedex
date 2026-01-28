import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { pokeapi } from "../services/pokeapi";
import { pokemonQueryKeys } from "./queryKeys";

interface PokemonQueryData {
  pokemons: any[];
  totalCount: number;
  isSearch: boolean;
}

export const usePokemonList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 18;
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const query = useQuery<PokemonQueryData>({
    queryKey: pokemonQueryKeys.list({
      search: debouncedSearch,
      page,
    }),
    queryFn: async () => {
      if (debouncedSearch.trim()) {
        const results = await pokeapi.searchPokemon(debouncedSearch);
        return {
          pokemons: results,
          totalCount: results.length,
          isSearch: true,
        };
      } else {
        const data = await pokeapi.getPaginatedPokemons(page, itemsPerPage);
        return {
          ...data,
          isSearch: false,
        };
      }
    },
    placeholderData: { pokemons: [], totalCount: 0, isSearch: false },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const isSearchMode = !!debouncedSearch.trim();
  const pokemons = query.data?.pokemons || [];
  const totalCount = query.data?.totalCount || 0;
  const totalPages = isSearchMode ? 1 : Math.ceil(totalCount / itemsPerPage);

  const clearSearch = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  }, []);

  return {
    pokemons,
    totalCount,
    search,
    setSearch,
    page: isSearchMode ? 1 : page,
    setPage,
    totalPages,
    isSearchMode: !!debouncedSearch.trim(),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    clearSearch,
  };
};
