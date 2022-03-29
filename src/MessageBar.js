import React from "react";
import {withTranslation} from 'react-i18next';

const MessageBar = (props) => {
    if (props.itemCount == 0) {
      return (
        <div>{props.t("message-bar.not-found")}</div>
      );
      /*
    } else {
      <div>Found {props.itemCount} results.</div>
      */
    }
}

export default withTranslation() (MessageBar);
