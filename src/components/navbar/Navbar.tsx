import i18n from "i18n";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import GaiaXButton from "components/buttons/GaiaXButton";
import LanguageModal from "components/modals/LanguageModal";
import { useNavbar } from "hooks/useNavbar";
import { AuthContext } from "context/AuthContextProvider";

import gaiaLogo from "../../assets/images/PLC-AAD-Logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t } = useTranslation();
  const navbarAssets = useNavbar();
  const authContext = useContext(AuthContext);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={gaiaLogo}
              alt="Gaia-X Logo"
              style={{ width: "300px", height: "50px" }}
            />
          </Link>
        </div>
        {authContext.isAuthenticated && (
          <ul className={styles["navigation-items"]}>
            {navbarAssets.map((asset, index) => (
              <li key={index} className={styles["navigation-item"]}>
                <NavLink
                  to={asset.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["navigation-item"]} ${styles.active}`
                      : styles["navigation-item"]
                  }
                >
                  {asset.navigationItemName}
                </NavLink>
              </li>
            ))}

            {/* Language Modal Activation Link */}
            <li
              className={styles["navigation-item"]}
              onClick={() => setIsLanguageModalOpen(true)}
            >
              {t("left-menu.choose-language")}
            </li>
          </ul>
        )}
        {!authContext.isAuthenticated ? (
          <GaiaXButton
            label={t("top-menu.signin")}
            handleOnClick={authContext.login}
          />
        ) : (
          <GaiaXButton
            label={t("top-menu.signout")}
            handleOnClick={authContext.logout}
          />
        )}

        {/* Language Modal Component */}
        <LanguageModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          changeLanguage={changeLanguage}
        />
      </div>
    </nav>
  );
}
