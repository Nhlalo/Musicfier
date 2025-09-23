import Styles from "./trackinformation.module.css";

export default function TrackInformation() {
  return (
    <section>
      <h2>Track Information</h2>
      <div className={Styles.trackInformationContainer}>
        <div>
          <p>Album:</p>
          <p>Certified Lover Boy</p>
        </div>
        <hr />
        <div>
          <p>Label:</p>
          <p>OvO</p>
        </div>
        <hr />
        <div>
          <p>Released</p>
          <p>2021</p>
        </div>
        <hr />
        <div>
          <p>Genres:</p>
          <p>Hip-Hop/Rap</p>
        </div>
        <hr />
        <div>
          <p>Recognized:</p>
          <p>17 Sep 2025 at 01:28</p>
        </div>
      </div>
    </section>
  );
}
