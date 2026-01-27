import axios from "axios";

const API_BASE = import.meta.env.VITE_POKEAPI_BASE_URL;

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
      dream_world?: {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats?: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  moves?: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  base_experience?: number;
  forms?: Array<{
    name: string;
    url: string;
  }>;
  species?: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

let cachedPokemons: PokemonListItem[] | null = null;

export const pokeapi = {
  async getPokemons(limit: number = 200): Promise<PokemonListItem[]> {
    if (cachedPokemons) {
      return cachedPokemons;
    }

    try {
      const response = await axios.get(`${API_BASE}/pokemon`, {
        params: {
          limit,
          offset: 0,
        },
      });

      cachedPokemons = response.data.results;

      return cachedPokemons;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  async getPokemonDetails(url: string): Promise<Pokemon> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  async getPaginatedPokemons(page: number = 1, limit: number = 15) {
    try {
      const allPokemons = await this.getPokemons(200);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const pageItems = allPokemons.slice(startIndex, endIndex);

      const pokemons = await Promise.all(
        pageItems.map((pokemon) => this.getPokemonDetails(pokemon.url)),
      );

      return {
        pokemons,
        totalCount: allPokemons.length,
      };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  async searchPokemon(searchTerm: string): Promise<Pokemon[]> {
    try {
      const allPokemons = await this.getPokemons(200);

      const filteredByName = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (searchTerm.length >= 3) {
        try {
          const response = await axios.get(
            `${API_BASE}/type/${searchTerm.toLowerCase()}`,
          );
          const pokemonsOfType = response.data.pokemon.map(
            (p: any) => p.pokemon,
          );

          const availableTypePokemons = pokemonsOfType.filter(
            (typePokemon: PokemonListItem) =>
              allPokemons.some((p) => p.name === typePokemon.name),
          );

          const combined = [...filteredByName, ...availableTypePokemons];
          const uniqueMap = new Map();

          combined.forEach((pokemon) => {
            if (!uniqueMap.has(pokemon.name)) {
              uniqueMap.set(pokemon.name, pokemon);
            }
          });

          const uniqueResults = Array.from(uniqueMap.values());

          const limitedResults = uniqueResults.slice(0, 30);

          return Promise.all(
            limitedResults.map((p) => this.getPokemonDetails(p.url)),
          );
        } catch {
          console.log(searchTerm, "not a valid type");
        }
      }

      const limitedResults = filteredByName.slice(0, 30);

      return Promise.all(
        limitedResults.map((p) => this.getPokemonDetails(p.url)),
      );
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  async getPokemonByIdOrName(idOrName: string | number): Promise<Pokemon> {
    try {
      const response = await axios.get(`${API_BASE}/pokemon/${idOrName}`);
      return response.data;
    } catch (error) {
      console.error("Error:", idOrName);
      throw error;
    }
  },

  clearCache() {
    cachedPokemons = null;
  },
};
