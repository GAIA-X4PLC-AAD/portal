import GaiaXButton from "components/buttons/GaiaXButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

import Title from "components/Title/Title";
import { ServiceOffering, Resource } from "utils/dataMapper";

import styles from "./SelfDescriptionCard.module.css";

interface ISelfDescriptionCard {
  label: string;
  isGaiaXComlpiant: boolean;
  name: string;
  description: string;
  selfDescription: ServiceOffering | Resource;
}

export default function SelfDescriptionCard({
  label,
  isGaiaXComlpiant,
  name,
  description,
  selfDescription,
}: Readonly<ISelfDescriptionCard>) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigationToDetailsPage = () => {
    // Check if claimsGraphUri is an array and has at least one entry
    if (
      Array.isArray(selfDescription.claimsGraphUri) &&
      selfDescription.claimsGraphUri.length > 0
    ) {
      // Extract the first URI from the array
      const firstUri = selfDescription.claimsGraphUri[0];
      // Encode the URI component to ensure special characters are URL-safe
      const encodedUri = encodeURIComponent(firstUri);
      // Navigate to the details page with the encoded URI
      navigate(`/details/${encodedUri}`);
    } else {
      // Handle the case where claimsGraphUri is not available or not in expected format
      console.error("Invalid claimsGraphUri:", selfDescription.claimsGraphUri);
      // You might want to show a user-friendly message or navigate to an error page
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <Title>{label}</Title>
        {isGaiaXComlpiant ? (
          <p>{t("resources.is-gaia-x-compliant")}</p>
        ) : (
          <p>{t("resources.not-gaia-x-compliant")}</p>
        )}
      </div>
      <div className={styles.content}>
        <Title>{name}</Title>
        <p>{description}</p>
        <div className={styles.button}>
          <GaiaXButton
            label="More Details"
            handleOnClick={handleNavigationToDetailsPage}
          />
        </div>
      </div>
    </div>
  );
}
