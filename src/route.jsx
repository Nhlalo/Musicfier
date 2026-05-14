import { createBrowserRouter } from "react-router";
import Home from "./pages/home/home";
import {
  homeColors,
  getChartColors,
  concertsColors,
  artistInforColors,
} from "./data/constants/colors";
import RootLayout from "./components/layout/rootLayout";
import AudioRecognition from "./pages/audioRecognition/audioRecognition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          colors: { ...homeColors },
        },
      },
      {
        lazy: async () => {
          const module = await import("./pages/charts/charts.jsx");
          return {
            element: <module.default />,
            loader: ({ params }) => {
              // params contains { chartType: "top50", country: "US" }
              const colors = getChartColors(params.chartType);

              // Return data that will be available in the component
              return {
                colors: colors,
              };
            },
          };
        },
        path: "charts/:chartType/:countryname",
        //loader is used as the header colors is based on the url params.
      },
      {
        path: "concerts/:countrycode",
        lazy: async () => {
          const module = await import("./pages/concerts/concerts.jsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...concertsColors },
        },
      },
      {
        path: "artist/:artist/:id",
        lazy: async () => {
          const module = await import("./pages/artistsInfor/artistInfor.jsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...artistInforColors },
        },
      },
      {
        path: "mymusic",
        lazy: async () => {
          const module = await import("./pages/myMusic/MyMusic.jsx");
          return { Component: module.default };
        },
        handle: {
          header: "hidden",
        },
      },
      {
        path: "audioRecognition",
        element: <AudioRecognition />,
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
    ],
  },
]);

export { router };
