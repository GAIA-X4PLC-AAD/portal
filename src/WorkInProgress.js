import React from "react";
import {withTranslation} from 'react-i18next';

const WorkInProgress = (props) => {
    return (
        <div> {props.component} {props.t("work-in-progress.message")}</div>
    );
}

export default withTranslation() (WorkInProgress);
