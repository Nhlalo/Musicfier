import { createBrowserRouter } from "react-router";
import {
  homeColors,
  chartsColors,
  concertsColors,
  artistInforColors,
} from "./data/constants/colors";
import RootLayout from "./components/layout/rootLayout";

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
        path: "charts",
        element: <Charts />,
        handle: {
          colors: { ...chartsColors },
        },
      },
      {
        path: "concerts",
        element: <Concerts />,
        handle: {
          colors: { ...concertsColors },
        },
      },
      {
        path: "artist/id",
        element: <ArtistInfor />,
        handle: {
          colors: { artistInforColors },
        },
      },
      {
        path: "audioRecognition",
        element: <AudioRecogntion />,
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
    ],
  },
]);

export { router };
