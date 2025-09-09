import { useState } from "react";
import { Link } from "react-router";

function Homepage() {
  return (
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
  );
}
