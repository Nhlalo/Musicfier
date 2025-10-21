import Concert from "./concert.jsx";
import Styles from "./allConcerts.module.css";
export default function AllConcerts() {
  return (
    <>
      <header>
        <h1>Find Concerts</h1>
      </header>
      <main>
        <div className={Styles.container}>
          {/* Dynamic concert links will be injected here */}
        </div>
        <p className={Styles.noConcerts}>No more concerts found</p>
      </main>
    </>
  );
}
