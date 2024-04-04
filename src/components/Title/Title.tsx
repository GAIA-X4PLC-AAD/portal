import styles from "./Title.module.css";

interface ITitle {
  children: string;
}

export default function Title({ children }: Readonly<ITitle>) {
  return <h1 className={styles.title}>{children}</h1>;
}
