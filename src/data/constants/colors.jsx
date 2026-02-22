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
  "transparent",
  "#fff",
  "#fff",
  "#000000",
  "#23aadc",
  "#242424",
  "#fff",
  "#000",
);

const concertsColors = selectColors(
  "#00bbff",
  "#fff",
  "#000",
  "#000000",
  "#000",
  "#000",
  "#000",
  "#000",
);
const artistInforColors = selectColors(
  "transparent",
  "#fff",
  "#000",
  "#000000",
  "#000",
  "#000",
  "#000",
  "#000",
);

function getChartColors(chartType) {
  // Define color schemes for different chart types

  const colorSchemes = {
    //top50 is top-50 via the url to accommodate for the space between top and 50
    top50: selectColors(
      "#000",
      "#000",
      "#fff",
      "#fff",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
    viral: selectColors(
      "rgb(43, 122, 144)",
      "rgb(43, 122, 144)",
      "#fff",
      "#fff",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
    discovery: selectColors(
      "rgb(91, 81, 58)",
      "rgb(91, 81, 58)",
      "#fff",
      "#fff",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.3)",
      "#fff",
      "#000",
    ),
  };

  const baseColors = colorSchemes[chartType];

  return baseColors;
}
export { homeColors, getChartColors, concertsColors, artistInforColors };
