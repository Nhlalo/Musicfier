import Styles from "./aboutArtist.module.css";
import { X, Play } from "lucide-react";

export default function aboutArtist() {
  return (
    <>
      <section className={Styles.container}>
        <button type="button" className={Styles.closeBTN}>
          <X aria-hidden="true" className={Styles.x} />
        </button>
        <div className={Styles.artistInforContainer}>
          <button type="button" className={Styles.playBTN}>
            <Play />
          </button>
          <span className={Styles.artistName}>Drake</span>
        </div>
      </section>
    </>
  );
}
