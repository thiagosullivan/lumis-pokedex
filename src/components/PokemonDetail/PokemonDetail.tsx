import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { Oval } from "react-loader-spinner";
import styles from "./PokemonDetail.module.scss";

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, isLoading } = usePokemonDetails(id || "");
  console.log(id, "ID DA PAGINA");

  if (isLoading)
    return (
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
    );

  if (!pokemon)
    return (
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
          <Link to="/">
            <b>← Voltar para o início</b>
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <Link to="/" className={styles.backButton}>
        ← Voltar para o início
      </Link>
      <div className={styles.pokemonDetails}>
        <div className={styles.header}>
          <h1>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <span>#{pokemon.id.toString().padStart(3, "0")}</span>
        </div>

        <div className={styles.pokemonContent}>
          <div className={styles.pokemonImage}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="main-image"
            />
          </div>

          <div className={styles.pokemonInfos}>
            <div className={styles.infoSection}>
              <h3>Tipos</h3>
              <div className={styles.type}>
                {pokemon.types.map((typeInfo, index) => (
                  <span
                    key={index}
                    className={`type-badge type-${typeInfo.type.name}`}
                  >
                    • {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3>Estatísticas</h3>
              <div className={styles.stats}>
                <div className={styles.subStats}>
                  <span>Altura:</span>
                  <span>{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className={styles.subStats}>
                  <span>Peso:</span>
                  <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {pokemon.abilities && (
              <div className={styles.infoSection}>
                <h3>Habilidades</h3>
                <div className={styles.abilities}>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="ability">
                      • {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
