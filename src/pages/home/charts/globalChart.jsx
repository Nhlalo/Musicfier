import { useEffect, useState, useMemo } from "react";
import { mockCharts } from "../../../data/__mocks__/spotify/spotify.mock";
import ChartContainer from "../../../components/shared/chartContainer/ChartContainer";
import ChartHeading from "../../../components/shared/chartHeading/ChartHeading";
import FeaturedArtists from "../../../components/shared/featuredArtists/FeaturedArtists";

const content = {
  mainBG: "#fff",
  displayFeaturedArtistsImg: false,
  heading: "GLOBAL TOP 200",
  headingDescr: "Top songs being discovered around the world right now",
  miniHeading:
    "See who made it on the list of the top songs worldwide on Shazam",
  displayChart: true,
  subHeading: "Global Top 200 Chart",
};
export default function GlobalCharts() {
  const [globalChart, setGlobalChart] = useState([]);

  const memoizedChartContainer = useMemo(
    () => <ChartContainer data={globalChart} />,
    [globalChart], // Only recreate when data changes
  );

  const memoizedFeaturedArtists = useMemo(
    () => <FeaturedArtists data={globalChart} />,
    [globalChart],
  );

  useEffect(() => {
    const mockGlobalChart = mockCharts;
    if (mockGlobalChart) {
      setGlobalChart(mockGlobalChart);
    }
  }, []);

  return (
    <ChartHeading
      mainBG={content.mainBG}
      displayFeaturedArtistsImg={content.displayFeaturedArtistsImg}
      heading={content.heading}
      headingDescr={content.headingDescr}
      miniHeading={content.miniHeading}
      displayChart={content.displayChart}
      subHeading={content.subHeading}
      chartContainer={memoizedChartContainer}
      featuredArtists={memoizedFeaturedArtists}
      seeAllGlobal={true}
      data={[]}
    />
  );
}
