import { useEffect, useState, useContext } from "react";
import { ChevronDown } from "lucide-react";
import getMockCountryCharts from "../../../data/mock/spotifyCountry-mock";
import { countryContext } from "../../charts";
import CountrySelect from "./countrySelect";
import Chart from "../chartlist/chartList";
import Styles from "./chartsHeader.module.css";

//Generate keys for the chart buttons
const chartTypeKeys = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

//Generate keys for the images
const imgKeys = Array.from({ length: 2 }, () => crypto.randomUUID());
//Generate keys for the  genre buttons
const genreKeys = Array.from({ length: 2 }, () => crypto.randomUUID());

function GenreBTNs() {
  const genres = ["Dance", "Hip-Hip/Rap", "Pop"];

  return (
    <>
      <div className={Styles.genresContainer}>
        {genres.map((value, index) => (
          <button className={Styles.genreBTN} key={genreKeys[index]}>
            {value}
          </button>
        ))}
      </div>
    </>
  );
}

export default function ChartHeader() {
  const chartTypes = ["Top 50", "Viral", "Discovery", "Genres"];

  const { setChart, chart } = useContext(chartContext);
  const { country } = useContext(countryContext);

  //Records the clicked button
  const [buttonClickStatus, setButtonClickStatus] = useState({
    "Top 50": true,
    Viral: false,
    Discovery: false,
    Genres: false,
  });
  const buttonClicked = useMemo(() => buttonClickStatus, [buttonClickStatus]);

  const sectionBG = buttonClickStatus["Top 50"]
    ? `${Styles.chartHeaderContainer}`
    : buttonClickStatus.Discovery
      ? `${Styles.chartHeaderContainer} ${Styles.brownBG}`
      : buttonClickStatus.Viral
        ? `${Styles.chartHeaderContainer} ${Styles.blueBG}`
        : `${Styles.chartHeaderContainer} `;

  const headerBG = buttonClickStatus["Top 50"]
    ? "#000"
    : buttonClickStatus.Discovery
      ? "rgb(91, 81, 58)"
      : buttonClickStatus.Viral
        ? "rgb(43, 122, 144)"
        : "#000";

  useEffect(() => {
    const chartData = getMockCountryCharts(country);
    setChart(chartData);
  }, [buttonClicked]);

  function changeBTNStatus(top50, viral, discovery, genres) {
    setButtonClickStatus({
      "Top 50": top50,
      Viral: viral,
      Discovery: discovery,
      Genres: genres,
    });
  }

  const handleChartTypeClick = (e) => {
    const item = e.currentTarget.dataset.item;
    if (item === "Top 50") {
      changeBTNStatus(true, false, false, false);
    } else if (item === "Viral") {
      changeBTNStatus(false, true, false, false);
    } else if (item === "Discovery") {
      changeBTNStatus(false, false, true, false);
    } else {
      changeBTNStatus(false, false, false, true);
    }
  };
  return (
    <>
      <section className={sectionBG}>
        <div className={Styles.chartHeaderWrapper}>
          <div className={Styles.countryBTNContainer}>
            <CountrySelect
              classname={Styles.countryBTN}
              classPrefix="country"
            />
          </div>
          <div className={Styles.chartContainer}>
            <div className={Styles.inforContainer}>
              <span className={Styles.country}>{country}</span>
              <span className={Styles.chartName}>Top 50</span>
              <span className={Styles.chartDescr}>
                {`The top songs in {${country}} this week`}
              </span>
            </div>
            <div className={Styles.buttonContainer}>
              {chartTypes.map((value, index) => {
                return (
                  <button
                    key={chartTypeKeys[index]}
                    className={
                      buttonClickStatus[value]
                        ? `${Styles.chartTypeBTNs} ${Styles.buttonClick}`
                        : `${Styles.chartTypeBTNs}`
                    }
                    data-item={value}
                    onClick={handleChartTypeClick}
                  >
                    {value === "Genres" ? (
                      <>
                        {value}
                        <ChevronDown
                          className={Styles.chevronIcon}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      value
                    )}
                  </button>
                );
              })}
              {buttonClickStatus.Genres && <GenreBTNs />}
            </div>
          </div>
          <div
            className={
              buttonClickStatus["Top 50"]
                ? Styles.imageContainer
                : buttonClickStatus.Viral
                  ? Styles.imageContainerViral
                  : buttonClickStatus.Discovery
                    ? Styles.imageContainerDiscovery
                    : Styles.imageContainer
            }
            aria-hidden="true"
          >
            {chart.slice(0, 2).map((songData, index) => {
              return (
                <img
                  src={songData.artistImage}
                  alt="Artist"
                  key={imgKeys[index]}
                  className={Styles.sideImage}
                  tabIndex="-1"
                />
              );
            })}
          </div>
        </div>
      </section>
      <Chart BG={headerBG} />
    </>
  );
}
