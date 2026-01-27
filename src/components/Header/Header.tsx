import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../assets/pokedex-icon.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} />
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Pokedex</Link>
      </nav>
    </header>
  );
};
