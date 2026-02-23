import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AudioLines, X, Ellipsis } from "lucide-react";
import findSong from "../../data/mock/audioRecogntion-mock";
import Styles from "./audioRecognition.module.css";
import searchImage from "../../assets/images/logo.png";

export default function AudioRecognition() {
  const [data, setData] = useState(null);
  const microphonPermission = true;
  const navigate = useNavigate();
  //Direct to the home page
  useEffect(() => {
    if (microphonPermission) {
      const id = "null";
      if (id) {
        const song = findSong(id);
        if (song) {
          setData(song);
        } else {
          setData("error");
        }
      }
    }
  }, []);

  if (data && data !== "error") {
    setData(null);
    navigate("/", {
      state: {
        errorState: true,
        songContent: data,
      },
    });
  }
  if (data == "error") {
    navigate("/", {
      state: {
        errorState: true,
      },
    });
  }
  function handleHomePage() {
    navigate("/");
  }

  return (
    <>
      <main className={Styles.main}>
        <div className={Styles.cancelIconContainer}>
          <button
            data-testid="homepage-link"
            aria-label="Direct to home page"
            onClick={handleHomePage}
          >
            {" "}
            <X className={Styles.cancelIcon} aria-hidden="true" />
          </button>
        </div>
        <section className={Styles.searchSection}>
          <div className={Styles.outerCircle} aria-hidden="true">
            {" "}
          </div>
          <div className={Styles.middleCircle} aria-hidden="true">
            {" "}
          </div>
          <div className={Styles.innerCircle} aria-hidden="true">
            {" "}
          </div>

          <button
            className={Styles.searchBTN}
            aria-label="Searching for the song"
          >
            <img
              src={searchImage}
              alt="searching"
              className={Styles.searchImg}
              aria-hidden="true"
            />
          </button>

          <div className={`${Styles.loadingMessage} ${Styles.listening}`}>
            <AudioLines className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>Listening for music</p>
            <p className={Styles.loadingMessageDescr}>
              Make sure your device can hear the song clearly
            </p>
          </div>
          <div className={`${Styles.loadingMessage} ${Styles.wait}`}>
            <Ellipsis className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>Searching</p>
            <p className={Styles.loadingMessageDescr}>Please wait</p>
          </div>
          <div className={`${Styles.loadingMessage} ${Styles.lastTry}`}>
            <Ellipsis className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>This is tough</p>
            <p className={Styles.loadingMessageDescr}>Last try</p>
          </div>
        </section>
      </main>
    </>
  );
}
