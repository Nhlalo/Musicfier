import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AudioLines, X, Ellipsis } from "lucide-react";
import findSong from "../../data/__mocks__/audio-recogntion.mock";
import Styles from "./AudioRecognition.module.css";
import searchImage from "../../assets/images/logo.png";

const saveSongToLocalStorage = (song) => {
  try {
    const myMusic = localStorage.getItem("myMusic");
    const existingSongs = myMusic ? JSON.parse(myMusic) : [];
    const songExists = existingSongs.some(
      (existingSong) => existingSong.id === song.id,
    );
    if (!songExists) {
      const makeJSON = JSON.stringify([...existingSongs, song]);
      localStorage.setItem("myMusic", makeJSON);
    }
  } catch (error) {
    console.error("Failed to save song:", error);
  }
};

export default function AudioRecognition() {
  const [data, setData] = useState(null);
  const microphonPermission = true;
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function recognizeAudio() {
      if (microphonPermission) {
        const id = "Bad Guy";
        if (id) {
          const song = await findSong(id);
          console.log("Song", song);
          saveSongToLocalStorage(song);

          if (!isMounted) return;

          navigate("/", {
            state: {
              errorState: false,
              songContent: song,
            },
          });
        } else {
          navigate("/", {
            state: {
              errorState: true,
            },
          });
        }
      }
    }

    recognizeAudio();

    return () => {
      isMounted = false;
    };
  }, []);

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
