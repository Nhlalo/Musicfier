import { useState } from "react";
import { Link } from "react-router";
import Error from "../../audioRecognition/error";
import Styles from "./about.module.css";
import Logo from "../../../assets/images/logo.png";

export default function About({ errorStatus = true }) {
  // The errorStatus prop will be useful for audio searching errors/ no audio found return
  const [error, setError] = useState(true);
  //This will allow the error element to change the state of its parent element
  function passToError(status) {
    setError(status);
  }
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
          {error && errorStatus && <Error error={passToError} />}
          <Link
            to="audioRecognition"
            aria-label="Audio recognition"
            className={Styles.audioDetectionLink}
          >
            <img src={Logo} alt="" aria-hidden="true" className={Styles.logo} />
          </Link>
          <p className={Styles.instructions}>Tap to Musicfy</p>
        </div>
      </div>
    </section>
  );
}
