import { Play } from "lucide-react";
import Styles from "./style.module.css";
export default function Identificationpage() {
  return (
    <section className={Styles.container}>
      <div className={Styles.songInforContainer}>
        <div>
          <h1>Over My Dead Body</h1>
          <p>Drake</p>
        </div>
        <button type="button" className={Styles.playBTN}>
          <Play />
        </button>
      </div>
      <button type="button" className={Styles.openDSPBTN}>
        Open in Spotify
      </button>
    </section>
  );
}
