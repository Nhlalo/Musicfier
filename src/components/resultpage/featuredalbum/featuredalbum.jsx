import { Play } from "lucide-react";
import Styles from "./styles.module.css";
import SpotifyLogo from "../topsongs/SpotifyLogo.png";
export default function FeaturedAlbum() {
  return (
    <section className={Styles.featuredAlbumContainer}>
      <h2>Featured Album</h2>
      <div className={Styles.albumInforContainer}>
        <button type="button" className={Styles.playAlbumBTN}>
          <img src={SpotifyLogo} alt="Album" className={Styles.albumCover} />
          <Play className={Styles.playIcon} />
        </button>
        <div>
          <p className={Styles.albumName}>Certified Lover Boy</p>
          <p className={Styles.releaseDate}>2021</p>
          <img src={SpotifyLogo} alt="Spotify" className={Styles.spotifyLogo} />
        </div>
      </div>
    </section>
  );
}
