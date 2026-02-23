import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import Error from "../../audioRecognition/error";
import { X } from "lucide-react";
import Logo from "../../../assets/images/logo.png";
import Styles from "./about.module.css";
import ArtistImg from "../../../assets/images/artistImg.jpg";

export default function About() {
  // The errorStatus prop will be useful for audio searching errors/ no audio found return
  const [isErrorClose, setIsErrorClose] = useState(false);
  const [isSongClose, setIsSongClose] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const displayError = location.state?.errorState;
  const displaySongInfor = location.state?.songState;
  //This will allow the error element to change the state of its parent element
  const passToError = useCallback((status) => setIsErrorClose(status), []);
  function handleCloseSongInfor() {
    setIsSongClose(true);
  }
  function handleAudioRecognition() {
    navigate("/audioRecognition");
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
          {displayError && !isErrorClose && <Error error={passToError} />}

          {displaySongInfor && !isSongClose && (
            <div
              className={Styles.songInforContainer}
              role="status"
              aria-live="polite"
            >
              <div className={Styles.songInforWrapper}>
                <button
                  type="button"
                  className={Styles.closeBTN}
                  onClick={handleCloseSongInfor}
                >
                  {" "}
                  <X className={Styles.xIcon} aria-hidden="true" />
                </button>
                <div className={Styles.songContainer}>
                  <img
                    src={ArtistImg}
                    alt="The boy"
                    className={Styles.songCover}
                  />
                  <div className={Styles.songData}>
                    <span className={Styles.artistName}>Title: The Boy</span>
                    <span className={Styles.songName}>Artist: Drake</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            to="audioRecognition"
            aria-label="Audio recognition"
            className={Styles.audioDetectionLink}
            onClick={handleAudioRecognition}
          >
            <img src={Logo} alt="" aria-hidden="true" className={Styles.logo} />
          </button>
          <p className={Styles.instructions}>Tap to Musicfy</p>
        </div>
      </div>
    </section>
  );
}
