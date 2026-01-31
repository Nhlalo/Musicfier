import Styles from "./about.module.css";
import Logo from "../../../assets/logo.png";

export default function About() {
  return (
    <section className={Styles.aboutContainer}>
      <div className={Styles.aboutWrapper}>
        <div className={Styles.websiteDescrWrapper}>
          <h1 className={Styles.heading}>Name Song in Seconds</h1>
          <p className={Styles.websiteDescr}>
            Find music, concerts and more with Musicfier
          </p>
        </div>
        <div className={Styles.buttonWrapper}>
          <button
            href="google.com"
            aria-label="Audio recognize"
            className={Styles.audioDetectionLink}
          >
            <img src={Logo} alt="" aria-hidden="true" className={Styles.logo} />
          </button>
          <p className={Styles.instructions}>Tap to Musicfy</p>
        </div>
      </div>
    </section>
  );
}
