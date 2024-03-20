import styles from "./GaiaXButton.module.css";

interface IGayaXButton {
  label: string;
  handleOnClick: () => void;
}

export default function GaiaXButton({
  label,
  handleOnClick,
}: Readonly<IGayaXButton>) {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      {label}
    </button>
  );
}
