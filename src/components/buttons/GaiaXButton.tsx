import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  handleOnClick: () => void;
}

export default function GaiaXButton({
  label,
  handleOnClick,
}: Readonly<IGaiaXButton>) {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      {label}
    </button>
  );
}
