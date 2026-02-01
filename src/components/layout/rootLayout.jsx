import { Outlet, useMatches } from "react-router";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function RootLayout() {
  const matches = useMatches();
  const routeHandles = matches.map((match) => match.handle).filter(Boolean);

  const mergedHandle = Object.assign({}, ...routeHandles);
  const shouldHideHeader = mergedHandle?.header === "hidden";
  const shouldHideFooter = mergedHandle?.footer === "hidden";

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
