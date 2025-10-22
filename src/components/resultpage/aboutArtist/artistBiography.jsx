import Styles from "./artistBiography.module.css";

export default function ArtistBiography() {
  return (
    <section aria-label="artist biography">
      <div className={Styles.artistContainer}>
        <span className={Styles.wordArtist}>Artist</span>
        <button
          type="button"
          className={Styles.closeBTN}
          aria-label="close artist view"
        >
          Done
        </button>
      </div>
      <header>
        <h1>Drake</h1>
      </header>
      <div className={Styles.birthRecord}>
        <div className={Styles.hometownContainer}>
          <span className={Styles.hometownWord}>HOMETOWN</span>
          <span className={Styles.birthCity}>Toronto, Canada</span>
        </div>
        <hr aria-hidden="true" />
        <div className={Styles.dateofbirthContainer}>
          <span className={Styles.bornWord}>BORN</span>
          <time datetime="1986-10-26" className={Styles.dateOfBirth}>
            October, 26, 1986
          </time>
        </div>
        <hr aria-hidden="true" />
      </div>
      <p className={Styles.artistDescription}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
        minima magnam hic labore! Sapiente laborum modi deserunt sunt,
        dignissimos, repudiandae, eos quisquam itaque sint optio nesciunt
        voluptates fugit earum beatae.
      </p>
    </section>
  );
}
