import styles from "./notConnected.module.css";
import { lexend } from "../../app/fonts";

export default function NotConnected(props) {
  return (
    <div className={styles.altPageContainer}>
      <h1 className={`${styles.title} ${lexend.className}`}>{props.title}</h1>
      <div className={`${styles.container} ${lexend.className}`}>
        <p>Oups ! Apparemment tu n'es pas encore connecté(e)...</p>
      </div>
    </div>
  );
}
