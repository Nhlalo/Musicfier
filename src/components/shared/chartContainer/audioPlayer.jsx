import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import SpotifyLogo from "../../../assets/images/spotifylogo.png";
import "react-h5-audio-player/lib/styles.css";
import "./audioPlayer.css";

export default function AudioPlay({
  songCover,
  previewLink,
  songName,
  artist,
  handleAudioPause,
  handleAudioReady,
}) {
  const playerRef = useRef(null);

  const [shouldPause, setShouldPause] = handleAudioPause;

  // Listen for state changes to pause audio
  useEffect(() => {
    if (shouldPause && playerRef.current?.audio?.current) {
      playerRef.current.audio.current.pause();
    }
    if (!shouldPause && playerRef.current?.audio?.current) {
      playerRef.current.audio.current.play();
    }
  }, [shouldPause]);

  function handlePlay() {
    setShouldPause(false);
    handleAudioReady(true);
  }

  function handlePause() {
    setShouldPause(true);
    handleAudioReady(false);
  }
  return (
    <div
      className="previewSongContainer"
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-label="Audio player section"
    >
      <div className="previewSongInforContainer">
        <img
          src={songCover}
          alt={artist}
          className="previewSongCover"
          aria-hidden="true"
        />
        <div className="previewSongInfor">
          <span className="preview">Now Previewing</span>
          <span className="previewSongName">{songName}</span>
          <span className="previewArtist">{artist}</span>
        </div>
      </div>
      <div className="audioControl">
        <span className="previewSpotifyContainer" aria-hidden="true">
          <img src={SpotifyLogo} alt="" className="previewSpotifyLogo" />
        </span>
        <AudioPlayer
          src={previewLink}
          autoPlay={true}
          showJumpControls={false}
          showSkipControls={false}
          showLoopControl={false}
          loop={false}
          ref={playerRef}
          onPause={handlePause}
          onPlay={handlePlay}
          onCanPlay={() => handleAudioReady(true)} //Fires when enough audio has been downloaded, not full download, to play
        />
      </div>
    </div>
  );
}
