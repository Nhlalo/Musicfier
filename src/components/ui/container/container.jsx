import Styles from "./container.module.css";
export default function Container({ children }) {
  return (
    <section className={Styles.Container}>
      <div className={Styles.wrapper}>{children}</div>
    </section>
  );
}
