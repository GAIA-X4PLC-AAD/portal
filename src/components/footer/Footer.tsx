import React from "react";
import { NavLink } from "react-router-dom";

import { useFooter } from "hooks/useFooter";
import { ReactComponent as MyIcon } from "../../assets/logos/msg_white.svg";

import styles from "./Footer.module.css";

export const Footer = () => {
  const footerAssets = useFooter();

  return (
    <div className={styles["footer-container"]}>
      <div className={styles.logo}>
        <p>Powered by</p>
        <MyIcon />
      </div>
      <p className={styles.copyright}>Gaia-X © 2024</p>
      <ul className={styles["navigation-items"]}>
        {footerAssets.map((footerAsset, index) => {
          return (
            <li className={styles["navigation-item"]} key={index}>
              <a href={footerAsset.path}>{footerAsset.navigationItemName}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
