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
      <section
        aria-label="Description of the artist"
        className={Styles.artistDescriptionContainer}
      >
        <h2 className={Styles.aboutWord}>ABOUT</h2>
        <p className={Styles.artistDescription}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
          repellendus corporis excepturi, omnis exercitationem maiores
          praesentium expedita libero incidunt nostrum minus quam velit iusto
          nobis cupiditate facere harum alias numquam.
          <button
            type="button"
            aria-label="Show more information"
            className={Styles.moreBTN}
          >
            MORE
          </button>
        </p>
      </section>
    </>
  );
}
