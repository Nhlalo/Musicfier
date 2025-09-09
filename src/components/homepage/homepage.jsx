import { useState } from "react";
import { Link } from "react-router";
import { Music2, Share, File } from "lucide-react";

const navIDS = { myMusic: crypto.randomUUID() };
const appInforIDS = {
  music: crypto.randomUUID(),
  songHistory: crypto.randomUUID(),
  share: crypto.randomUUID(),
};
const footerIDS = { terms: crypto.randomUUID(), contact: crypto.randomUUID() };

function Homepage() {
  return (
    <>
      <header>
        <div>
          <img src="../assets/Logo.PNG" alt="Musicfier" />
          <h1>Musicfier</h1>
        </div>
        <nav>
          <ul>
            <li key={navIDS.myMusic}>
              <Link>My Library</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Tap To Musicfy</h2>
          <button type="button">
            <img src="../assets/SearchImage.PNG" alt="search" />
          </button>
        </section>
        <section>
          <ul>
            <li key={appInforIDS.music}>
              <Music2 />
              <p>Real-time music recognition</p>
            </li>
            <li key={appInforIDS.songHistory}>
              <File />
              <p>Song history</p>
            </li>
            <li key={appInforIDS.share}>
              <Share />
              <p>Share across platforms</p>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <ul>
          <li key={footerIDS.terms}>Terms</li>
          <li key={footerIDS.contact}>Contact</li>
        </ul>
      </footer>
    </>
  );
}
