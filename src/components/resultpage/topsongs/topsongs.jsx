import { Play } from "lucide-react";
import Styles from "./style.module.css";
import SpotifyLogo from "./spotifylogo.png";

export default function TopSongspage() {
  return (
    <section className={Styles.topSongContainer}>
      <div className={Styles.songContainer}>
        <button type="button">
          <Play />
        </button>
        <div className={Styles.songInforContainer}>
          <div className={Styles.songInfo}>
            <p className={Styles.songTitle}>Hold On, We're Going Home</p>
            <p className={Styles.artistName}>Drake</p>
          </div>
          <img src={SpotifyLogo} alt="Spotify" className={Styles.spotifyLogo} />
        </div>
      </div>
    </section>
  );
}
