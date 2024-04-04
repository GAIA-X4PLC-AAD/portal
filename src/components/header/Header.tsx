import { FunctionComponent } from "react";

import Title from "components/Title/Title";
import Text from "components/Text/Text";

import styles from "./Header.module.css";

interface IHeader {
  title: string;
  content: string;
  Image: FunctionComponent;
}

export default function Header({ title, content, Image }: Readonly<IHeader>) {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-image"]}>
        <Image />
      </div>
      <div className={styles["header-content"]}>
        <Title>{title}</Title>
        <Text>{content}</Text>
      </div>
    </div>
  );
}
