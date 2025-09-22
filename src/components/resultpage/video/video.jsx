import { Play } from "lucide-react";
import Styles from "./styles.module.css";
import SpotifyLogo from "../topsongs/SpotifyLogo.png";

export default function Video() {
  return (
    <section className={Styles.videoContainer}>
      <h2>Video</h2>
      <figure>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch Fair Trade by Drake on Youtube"
        >
          <img
            src={SpotifyLogo}
            alt="thumbnail for the video"
            className={Styles.thumbnail}
          />
          <Play className={Styles.youtubeLogo} />
        </a>
        <figcaption>Drake-Fair Trade (Audio) ft. Travis Scott</figcaption>
      </figure>
    </section>
  );
}
