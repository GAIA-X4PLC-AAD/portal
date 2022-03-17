import React from "react";
import {withTranslation} from 'react-i18next';

const MessageBar = (props) => {
    return (
        <div>{props.t("message-bar.not-found")}</div>
    );
}

export default withTranslation() (MessageBar);
