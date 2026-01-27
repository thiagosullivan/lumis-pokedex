import { Link } from "react-router-dom";
import { POKEMON_TYPE_COLORS } from "../../utils/constants";
import styles from "./Card.module.scss";
import type { Pokemon } from "../../services/pokeapi";

interface CardProps {
  pokemon: Pokemon;
}

export const Card = ({ pokemon }: CardProps) => {
  const firstType = pokemon.types[0].type.name;

  const typeColor = POKEMON_TYPE_COLORS[firstType] || "#212e4c";

  return (
    <div className={styles.card}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className={styles.cardHeader}>
          <p style={{ color: typeColor }}>{firstType}</p>
          <span>#{pokemon.id}</span>
        </div>
        <div className={styles.cardContent}>
          <img src={pokemon.sprites.front_default} />
          <h3>{pokemon.name}</h3>
        </div>
      </Link>
    </div>
  );
};
