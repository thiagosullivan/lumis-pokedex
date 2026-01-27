import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Footer from "../Footer/Footer";
import { usePokemonList } from "../../hooks/usePokemonList";

export const Layout = () => {
  const {
    pokemons,
    isLoading,
    search,
    setSearch,
    page,
    totalPages,
    setPage,
    clearSearch,
    isSearchMode,
  } = usePokemonList();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet
          context={{
            pokemons,
            isLoading,
            isSearchMode,
            page,
            totalPages,
            setPage,
            search,
            setSearch,
            clearSearch,
          }}
        />
      </main>
      <Footer />
    </>
  );
};
