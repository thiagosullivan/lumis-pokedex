import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido por{" "}
        <Link to="https://thiagosullivanportfolio.vercel.app/">Thiago</Link>
      </p>
    </footer>
  );
};

export default Footer;
