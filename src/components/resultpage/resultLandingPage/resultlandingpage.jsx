import Styles from "./resultlandingpage.module.css";
import { Share, Ellipsis, X } from "lucide-react";


export default function ResultLandinPage() {
  return (
    <section className={Styles.container}>
      <div className={Styles.toolbar}>
        <X />
        <div className={Styles.actionBTN}>
          <button type="button" className={Styles.shareBTN}>
            <Share />
          </button>
          <button type="buttonn">
            <Ellipsis />
          </button>
        </div>
      </div>
      
    </section>
  );
}
