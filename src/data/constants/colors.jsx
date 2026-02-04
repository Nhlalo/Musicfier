function selectColors(bg, bg1, color, color1, logoBG, logoBG1, btnBG, btnBG1) {
  return {
    default: {
      bg,
      color,
      logoBG,
      btnBG,
    },
    scrolled: {
      bg: bg1,
      color: color1,
      logoBG: logoBG1,
      btnBG: btnBG1,
    },
  };
}

const homeColors = selectColors(
  "#00bbff",
  "#fff",
  "#fff",
  "#000000",
  "#3b86f7",
  "#242424",
  "#fff",
  "#000",
);

const concertsColors = selectColors(
  "#00bbff",
  "#fff",
  "#3b86f7",
  "#fff",
  "#fff",
  "#000000",
  "#242424",
  "#000",
);
const artistInforColors = selectColors(
  "#00bbff",
  "#fff",
  "#3b86f7",
  "#fff",
  "#fff",
  "#000000",
  "#242424",
  "#000",
);

function getChartColors(chartType) {
  // Define color schemes for different chart types

  const colorSchemes = {
    //top50 is top-50 via the url to accommodate for the space between top and 50
    "top-50": selectColors(
      "#000",
      "#000",
      "#fff",
      "#fff",
      "#3b86f7",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
    viral: selectColors(
      "rgb(43, 122, 144)",
      "rgb(43, 122, 144)",
      "#fff",
      "#fff",
      "#3b86f7",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
    discovery: selectColors(
      "rgb(91, 81, 58)",
      "rgb(91, 81, 58)",
      "#fff",
      "#fff",
      "#3b86f7",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
    genres: selectColors(
      "#000",
      "#000",
      "#fff",
      "#fff",
      "#3b86f7",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
  };

  // Get base colors for chart type
  const baseColors = colorSchemes[chartType];

  return baseColors;
}
export { homeColors, getChartColors, concertsColors, artistInforColors };
