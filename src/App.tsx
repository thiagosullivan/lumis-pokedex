import { useOutletContext } from "react-router-dom";
import { Card } from "./components/Card/Card";
import { Oval } from "react-loader-spinner";
import Pagination from "./components/Pagination/Pagination";
import { Search } from "./components/Search/Search";

interface OutletContext {
  pokemons: any[];
  isLoading: boolean;
  isSearchMode: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  clearSearch: () => void;
}

function App() {
  const {
    pokemons,
    isLoading,
    isSearchMode,
    page,
    totalPages,
    setPage,
    search,
    setSearch,
    clearSearch,
  } = useOutletContext<OutletContext>();

  if (isLoading) {
    return (
      <div>
        <Search
          search={search}
          onSearchChange={setSearch}
          onClearSearch={clearSearch}
        />
        <div className="centeredContent">
          <Oval
            height={80}
            width={80}
            color="#212e4c"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#212e4c"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </div>
    );
  }

  if (pokemons.length <= 0) {
    return (
      <>
        <Search
          search={search}
          onSearchChange={setSearch}
          onClearSearch={clearSearch}
        />
        <div className="centeredContent">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <p>Pokémon não encontrado.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="">
      <Search
        search={search}
        onSearchChange={setSearch}
        onClearSearch={clearSearch}
      />
      <div className="mainContainer">
        {pokemons.map((pokemon) => (
          <Card pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      {!isSearchMode && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
