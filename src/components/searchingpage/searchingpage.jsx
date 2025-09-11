import { useState } from "react";
import { Link } from "react-router";
import SearchImage from "../../assets/searchimage.png";
import { X } from "lucide-react";
import { AudioLines } from "lucide-react";
import { Ellipsis } from "lucide-react";
import Styles from "./style.module.css";

export default function Searchingpage() {
  return (
    <main className={Styles.main}>
      <div>
        <X />
      </div>
      <section>
        <button className={Styles.searchBTN}>
          <img src={SearchImage} alt="searching" className={Styles.searchImg} />
        </button>
        <div>
          <AudioLines />
          <p>Listenign for music</p>
          <p>Make sure your device can hear the song clearly</p>
        </div>
        <div>
          <Ellipsis />
          <p>Searching</p>
          <p>Please wait</p>
        </div>
        <div>
          <p>This is tough</p>
          <p>Last try</p>
        </div>
      </section>
    </main>
  );
}
