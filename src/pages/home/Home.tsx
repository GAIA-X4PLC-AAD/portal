import Header from "components/header/Header";
import Title from "components/Title/Title";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import Text from "components/Text/Text";
import { ReactComponent as HeaderImage } from "../../assets/images/header_image.svg";
import { AuthContext } from "context/AuthContextProvider";

import styles from "./Home.module.css";

export default function Home() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  // Guidelines for logged in Users
  const guidelines = t("article.how-to-start-guidelines");

  return (
    <div className={styles["home-container"]}>
      <Header
        title={t("home.header.title")}
        content={t("home.marketplace_text")}
        Image={HeaderImage}
      />
      {authContext.isAuthenticated ? (
        <div className={styles["home-content"]}>
          <Title>{t("article.how-to-start")}</Title>
          {Object.values(guidelines).map((guideline, index) => {
            return <Text key={index}>{`→ ${guideline}`}</Text>;
          })}
        </div>
      ) : (
        <div className={styles["home-content"]}>
          <Title>{t("article.what-is-gaiax")}</Title>
          <Text>{t("article.what-is-gaiax-message-introduction-section")}</Text>
          <Text>{t("article.what-is-gaiax-message-main-section")}</Text>
          <Text>{t("article.what-is-gaiax-message-ending-section")}</Text>
        </div>
      )}
    </div>
  );
}
