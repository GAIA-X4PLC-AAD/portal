import GaiaXButton from "components/buttons/GaiaXButton";

import styles from "./SelfDescriptionCard.module.css";

interface ISelfDescriptionCard {
  label: string;
  isGaiaXComlpiant: boolean;
  name: string;
  description: string;
}

export default function SelfDescriptionCard({
  label,
  isGaiaXComlpiant,
  name,
  description,
}: Readonly<ISelfDescriptionCard>) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <h1>{label}</h1>
        {isGaiaXComlpiant ? (
          <p>Gaia-X compliant</p>
        ) : (
          <p>Not Gaia-X compliant</p>
        )}
      </div>
      <div className={styles.content}>
        <h1>{name}</h1>
        <p>{description}</p>
        <div className={styles.button}>
          <GaiaXButton label="More Details" handleOnClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
