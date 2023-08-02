import React from "react";
import {withTranslation} from 'react-i18next';

import PropTypes from 'prop-types';

const WorkInProgress = (props) => {
    return (
        <div> {props.component} {props.t("work-in-progress.message")}</div>
    );
}

WorkInProgress.propTypes = {
    component: PropTypes.node,
    t: PropTypes.func,
}


export default withTranslation() (WorkInProgress);
