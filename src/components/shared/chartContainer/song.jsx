import { useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Play, Pause, LoaderCircle } from "lucide-react";
import ImageReplacement from "../../ui/imageReplacement";
import AudioPlay from "./audioPlayer";
import Styles from "./chartContainer.module.css";

//Generate keys for the list of links
let keys = [];
for (let i = 0; i < 20; i++) {
  keys.push(crypto.randomUUID());
}
export default function Song({
  songLink,
  songName,
  index,
  image,
  actName,
  artistID,
  songPreview,
  handleArtistSong,
}) {
  const [shouldPause, setShouldPause] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const location = useLocation();
  const hasArtistInUrl = location.pathname.includes("artist");
  //This adis in the verification of the selected song being the one that is playing rather than playing all the songs at once.
  const artistsong = `${artistID}_${songName}`;
  const [artistSong, setArtistSong] = handleArtistSong;
  //This verifies if the selected song selected is the one that is playing to prevent playing all the songs at once
  const isPlaying = artistSong == artistsong;

  const handleAudioPause = useMemo(
    () => [shouldPause, setShouldPause],
    [shouldPause],
  );
  const handleAudioReady = useCallback(() => {
    setIsReady(true);
  }, []);

  function handleClick(event) {
    const button = event.currentTarget;
    const songArtist = button.dataset.artistsong;
    if (artistSong != artistsong && songPreview) {
      setArtistSong(songArtist);
    }

    if (shouldPause && songPreview) {
      setShouldPause(false);
      setIsReady(true);
    }
    if (!shouldPause && songPreview) {
      setShouldPause(true);
      setIsReady(false);
    }
  }

  return (
    <>
      <div
        href={songLink}
        aria-label={`information about ${songName} `}
        className={Styles.songProfileLink}
        data-song-index={index}
        key={keys[index]}
      >
        <div className={Styles.songProfileWrapper}>
          <div className={Styles.playSongWrapper}>
            {!hasArtistInUrl && (
              <span
                aria-label="Chart Position: "
                className={Styles.chartPosition}
              >
                {index + 1}
              </span>
            )}
            <button
              type="button"
              aria-label="play song"
              className={Styles.playSongBTN}
              onClick={handleClick}
              data-artistsong={`${artistID}_${songName}`}
            >
              {/* When there is no image use just display an icon */}
              {image && (
                <img
                  src={image}
                  alt={actName}
                  aria-hidden="true"
                  className={Styles.artistImg}
                  loading="lazy"
                />
              )}
              {!image && <ImageReplacement iconClass={Styles.artistImg} />}
              <div className={Styles.playIconContainer}>
                {shouldPause && !isReady && (
                  <Play aria-hidden="true" className={Styles.songPlayIcon} />
                )}
                {/* When not enough audio has been downloaded, not a full download, to start playing */}
                {!shouldPause && isReady && (
                  <Pause aria-hidden="true" className={Styles.songPlayIcon} />
                )}
                {/* When not enough audio has been downloaded to start playing */}
                {shouldPause && isReady && (
                  <LoaderCircle
                    aria-hidden="true"
                    className={`${Styles.songPlayIcon} ${Styles.loaderCircleIcon}`}
                  />
                )}
              </div>
            </button>
          </div>

          <div className={Styles.songInforWrapper}>
            <span className={Styles.songName}>{songName}</span>
            {!hasArtistInUrl && (
              <Link
                to={`/artist/${actName}/${artistID}`}
                aria-label={`View ${actName}'s profile`}
                className={Styles.artistNameLink}
              >
                {actName}
              </Link>
            )}
            {hasArtistInUrl && (
              <span
                to={`/artist/${actName}/${artistID}`}
                aria-label={`View ${actName}'s profile`}
                className={Styles.artistName}
              >
                {actName}
              </span>
            )}
          </div>
        </div>
        <hr aria-hidden="true" className={Styles.hr} />
      </div>
      {isPlaying && songPreview && (
        <AudioPlay
          songName={songName}
          artist={actName}
          previewLink={songPreview}
          songCover={image}
          handleAudioPause={handleAudioPause}
          style={{ display: isReady ? "block" : "none" }}
          handleAudioReady={handleAudioReady}
        />
      )}
    </>
  );
}
