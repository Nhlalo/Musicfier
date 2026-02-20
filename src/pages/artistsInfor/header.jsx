import { useState, useEffect } from "react";
import styled from "styled-components";
import { Ticket } from "lucide-react";
import debounce from "../../utils/debounce";
import ImageReplacement from "../../components/ui/imageReplacement";
import Styles from "./artistInfor.module.css";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #ccc;
  padding-bottom: 1.875rem;
  padding-top: 3.75rem;
  @media (max-width: 768px) {
    background-image: ${(props) =>
      props.imageurl ? `url(${props.imageurl})` : "none"};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;
export default function ArtistInforHeader({ artistData, concerts }) {
  const artistName = artistData?.artistName;
  const artistImage = artistData?.artistImage;
  const genre = artistData?.genre;

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const greaterthan768 = windowSize.width >= 768;

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    window.addEventListener("resize", handleResize);

    // Initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderContainer imageurl={artistImage}>
      <div className={Styles.headerWrapper}>
        <div className={Styles.headerArtistImgContainer}>
          <div className={Styles.headerArtistImgWrapper}>
            {/* Display an icon if there is no image provided for the artist */}
            {artistImage && greaterthan768 && (
              <img
                src={artistImage}
                alt={artistName}
                className={Styles.headerArtistImg}
              />
            )}
            {!artistImage && greaterthan768 && (
              <ImageReplacement iconClass={Styles.headerArtistImg} />
            )}
          </div>
        </div>
        <div className={Styles.artistInforContainer}>
          <h2 className={Styles.genre}>{genre}</h2>
          <h1 className={Styles.headerArtistName}>{artistName}</h1>
          {concerts.length > 0 && (
            <span className={Styles.tour}>
              {" "}
              <Ticket aria-hidden="true" className={Styles.ticketIcon} /> On
              Tour
            </span>
          )}
          {!concerts.length && (
            <span className={Styles.tour}>
              {" "}
              <Ticket aria-hidden="true" className={Styles.ticketIcon} /> Not On
              Tour
            </span>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
}
