import React from "react";
import { NavLink } from "react-router-dom";

import { useNavbar } from "hooks/useNavbar";
import { ReactComponent as MyIcon } from "../../assets/logos/msg_white.svg";

import styles from "./Footer.module.css";

export const Footer = () => {
  const footerAssets = useNavbar();

  return (
    <div className={styles["footer-container"]}>
      {/* <a href="#">{t("links.imprint")}</a>
          <a href="#">{t("links.privacy")}</a>
          <a href="#">{t("links.policy")}</a>
          <a href="#">{t("links.cookie_settings")}</a>
          <a href="#">{t("links.terms_and_conditions")}</a>
          <a href="#">{t("links.contact")}</a>
          <a href="#">{t("links.help")}</a> */}
      {/* <img src="/images/logos/bmwk_eu.webp" alt={t("footer_bmwk_eu")} /> */}

      <div className={styles.logo}>
        <p>Powered by</p>
        <MyIcon></MyIcon>
      </div>
      <p className={styles.copyright}>Gaia-X © 2024</p>
      <ul className={styles["navigation-items"]}>
        <li className={styles["navigation-item"]}>
          <a href="https://www.msg.group/en/privacy">Privacy</a>
        </li>
        <li className={styles["navigation-item"]}>
          <a href="https://www.msg.group/en/imprint">Imprint</a>
        </li>
      </ul>
    </div>
  );
};
