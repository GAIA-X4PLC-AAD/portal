import styles from "./GaiaXButton.module.css";

interface IGayaXButton {
  label: string;
}

export default function GaiaXButton({ label }: Readonly<IGayaXButton>) {
  return <button className={styles.button}>{label}</button>;
}
