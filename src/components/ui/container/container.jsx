import Styles from "./container.module.css";
export default function Container({ children }) {
  return (
    <section className={Styles.container}>
      <div className={Styles.wrapper}>{children}</div>
    </section>
  );
}
