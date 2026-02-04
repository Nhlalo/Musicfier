import { useContext } from "react";
import { Play } from "lucide-react";
import { chartContext } from "../charts";
import mockYouTubeMusicLink from "../../../data/mock/youtube-mock";
import spotifyLogo from "../../../assets/images/spotifylogo.png";
import youtubeLogo from "../../../assets/images/youtube.png";
import Styles from "./chartList.module.css";

export default function Chart({ BG = "rgb(89, 82, 63)" }) {
  return (
    <section className={Styles.chartContainer}>
      <div className={Styles.chartWrapper}>
        <ChartContainer />
        <MusicVideo BG={BG} />
      </div>
    </section>
  );
}

function Song({ songlink, chartNumber, songName, artist, songCover }) {
  return (
    <li className={Styles.chartSong}>
      <div className={Styles.overlay} aria-hidden="true">
        <img
          src={spotifyLogo}
          alt="Spotify Logo"
          className={Styles.spotifyLogo}
        />
      </div>
      <a
        href={songlink}
        aria-label={`play ${songName} by ${artist} on Spotify`}
        className={Styles.songlink}
      >
        <span aria-hidden="true" className={Styles.chartNumber}>
          {chartNumber}
        </span>
        <div aria-hidden="true" className={Styles.songContainer}>
          <div className={Styles.songCoverContainer}>
            <img
              src={songCover}
              alt=""
              className={Styles.songCover}
              loading="lazy"
            />
            <div className={Styles.playIconContainer}>
              <Play className={Styles.playIcon} />
            </div>
          </div>
          <div className={Styles.songInforContainer}>
            <span className={Styles.artistName}>{artist}</span>
            <span className={Styles.songName}>{songName}</span>
          </div>
        </div>
      </a>
      <hr aria-hidden="true" />
    </li>
  );
}

function ChartContainer() {
  const { chart } = useContext(chartContext);

  return (
    <ul className={Styles.chartSongContainer}>
      {chart?.length &&
        chart.map((song) => {
          return (
            <Song
              chartNumber={song.position}
              songName={song.songName}
              artist={song.artistName}
              songlink={song.spotifyLink}
              key={song.key}
              songCover={song.artistImage}
            />
          );
        })}
    </ul>
  );
}
function MusicVideo({ BG }) {
  const { chart } = useContext(chartContext);
  const firstSong = chart.length ? chart[0] : [];
  const artistName = firstSong?.artistName;
  const songName = firstSong?.songName;
  const artistImagery = firstSong?.artistImage;
  const musicVideoLink = mockYouTubeMusicLink(artistName, songName);
  return (
    <div className={Styles.musicVideoContainer}>
      <div className={Styles.musicVideoWrapper}>
        <h2 className={Styles.musicVideoHeader}>Music Video</h2>
        <div
          className={Styles.musicVideoSubContainer}
          style={{ backgroundColor: BG }}
        >
          <div className={Styles.musicVideoLinkContainer}>
            <a
              href={musicVideoLink}
              aria-label={`play ${songName} by ${artistName} on Youtube`}
              className={Styles.musicVideoLink}
            >
              <img
                src={artistImagery}
                alt={`Song cover of ${songName} by ${artistName} `}
                aria-hidden="true"
                className={Styles.songImg}
                loading="lazy"
              />
              <div className={Styles.playContainer}>
                <Play className={Styles.play} aria-hidden="true" />
              </div>
            </a>
          </div>
          <div className={Styles.musicVideoInforContainer}>
            <div className={Styles.musicVideoInfor}>
              {" "}
              <span className={Styles.musicVideoName}>{songName}</span>
              <span className={Styles.musicArtistName}>{artistName}</span>
            </div>
            <a
              href={musicVideoLink}
              className={Styles.videoLink}
              aria-label={`play ${songName} by ${artistName} on Youtube`}
            >
              {" "}
              Watch On
              <img
                src={youtubeLogo}
                alt="Youtube logo"
                className={Styles.youtubeLogo}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
