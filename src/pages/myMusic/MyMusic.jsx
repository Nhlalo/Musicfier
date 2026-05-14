import generateFallBackImage from "../../utils/generateFallBackImage";
import generateSizes from "../../utils/generateImgSizes";
import generateSrcset from "../../utils/generateImgSrcset";
import ImageReplacement from "../../components/ui/imageReplacement";
import Song from "../../components/shared/chartContainer/song";
import Styles from "./myMusic.module.css";

export default function MyMusic() {
  const myMusic = localStorage.getItem("myMusic");
  const existingSongs = myMusic ? JSON.parse(myMusic) : null;

  return (
    <>
      <header className={Styles.header}>
        <h1 className={Styles.heading}>My Music</h1>
      </header>
      <main className={Styles.container}>
        {existingSongs && existingSongs.length > 0 ? (
          existingSongs.map((songInfor, index) => {
            const coverImage = songInfor.coverUrl;

            return (
              <div key={index}>
                {coverImage?.length > 0 && (
                  <img
                    src={generateFallBackImage(coverImage)}
                    srcSet={generateSrcset(coverImage)}
                    sizes={generateSizes(coverImage)}
                    alt={`${songInfor.title} by ${songInfor.artist}`}
                    className={Styles.songCover}
                  />
                )}
                {coverImage?.length == 0 && (
                  <ImageReplacement iconClass={Styles.songCover} />
                )}

                <span>{songInfor.artist}</span>
                <span>{songInfor.title}</span>
              </div>
            );
          })
        ) : (
          <div className={Styles.noMusic}>
            🎵 No Music Stored Yet
            <br />
            <small>Start adding your favorite songs!</small>
          </div>
        )}
      </main>
    </>
  );
}
