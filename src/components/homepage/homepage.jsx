import { useState } from "react";
import { Link } from "react-router";
import { Music2, Share, File } from "lucide-react";

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
            <li>
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
            <li>
              <Music2 />
              <p>Real-time music recognition</p>
            </li>
            <li>
              <File />
              <p>Song history</p>
            </li>
            <li>
              <Share />
              <p>Share across platforms</p>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <ul>
          <li>Terms</li>
          <li>Contact</li>
        </ul>
      </footer>
    </>
  );
}
