import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/_reset.scss";
import "./styles/main.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonDetail } from "./components/PokemonDetail/PokemonDetail.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      // cacheTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 10,
    },
  },
});

const basename = import.meta.env.PROD ? "/lumis-pokedex" : "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="pokemon/:id" element={<PokemonDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
);
