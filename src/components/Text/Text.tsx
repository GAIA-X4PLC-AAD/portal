import styles from "./Text.module.css";

interface IText {
  children: string;
}

export default function Text({ children }: Readonly<IText>) {
  return <p className={styles.text}>{children}</p>;
}
