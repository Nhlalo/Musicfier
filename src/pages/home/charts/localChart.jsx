import { useEffect, useState, useMemo } from "react";
import getMockCountryCharts from "../../../data/__mocks__/spotify/spotify-country.mock";
import ChartContainer from "../../../components/shared/chartContainer/ChartContainer";
import ChartHeading from "../../../components/shared/chartHeading/ChartHeading";
import FeaturedArtists from "../../../components/shared/featuredArtists/FeaturedArtists";

export default function LocalCharts({ localChart, userCountry }) {
  const content = {
    mainBG: "#f2f2f7",
    displayFeaturedArtistsImg: true,
    heading: `DISCOVERY ${userCountry?.toUpperCase()}`,
    headingDescr: "Rising tracks from new and upcoming artists",
    miniHeading: "Be the first to listen to these future hit songs",
    displayChart: false,
    subHeading: `Discovery ${userCountry} Tracks`,
  };

  const memoizedChartContainer = useMemo(
    () => <ChartContainer data={localChart} />,
    [localChart],
  );

  const memoizedFeaturedArtists = useMemo(
    () => <FeaturedArtists data={localChart} />,
    [localChart],
  );

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
      userCountry={userCountry}
      seeAllGlobal={false}
      data={localChart}
    />
  );
}
