import Styles from "./styles.module.css";
import { Share } from "lucide-react";

export default function ShareButton() {
  return (
    <section>
      <button>
        <Share />
        Share Song
      </button>
    </section>
  );
}
