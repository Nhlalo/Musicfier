function selectColors(bg, bg1, color, color1, logoBG, logoBG1, btnBG, btnBG1) {
  return {
    default: {
      bg,
      color,
      logoBG,
      btnBG,
    },
    scrolled: {
      bg1,
      color1,
      logoBG1,
      btnBG1,
    },
  };
}

const homeColors = selectColors(
  "#00bbff",
  "#fff",
  "#3b86f7",
  "#fff",
  "#fff",
  "#000000",
  "#242424",
  "#000",
);
const chartsColors = selectColors(
  "#00bbff",
  "#fff",
  "#3b86f7",
  "#fff",
  "#fff",
  "#000000",
  "#242424",
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
export { homeColors, chartsColors, concertsColors, artistInforColors };
