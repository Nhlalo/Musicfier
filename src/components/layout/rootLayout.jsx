import { createContext, useState, useEffect } from "react";
import { Outlet, useMatches } from "react-router";
import { mockUserLocation } from "../../data/mock/user-location-mock";
import Header from "./header/header";
import Footer from "./footer/footer";

const LocationContext = createContext();
export default function RootLayout() {
  const [location, setLocation] = useState(null);

  const matches = useMatches();
  const routeHandles = matches.map((match) => match.handle).filter(Boolean);

  const mergedHandle = Object.assign({}, ...routeHandles);
  const shouldHideHeader = mergedHandle?.header === "hidden";
  const shouldHideFooter = mergedHandle?.footer === "hidden";

  useEffect(() => {
    const userLocation = mockUserLocation.country;
    setLocation(userLocation);
  }, []);

  return (
    <>
      <LocationContext.Provider value={location}>
        {!shouldHideHeader && <Header />}
        <main>
          <Outlet />
        </main>
        {!shouldHideFooter && <Footer />}
      </LocationContext.Provider>
    </>
  );
}
export { LocationContext };
