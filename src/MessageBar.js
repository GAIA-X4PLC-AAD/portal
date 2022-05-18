import React from "react";
import {withTranslation} from 'react-i18next';

import PropTypes from 'prop-types';

const MessageBar = (props) => {
    if (props.itemCount === 0) {
      return (
        <div>{props.t("message-bar.not-found")}</div>
      );
      /*
    } else {
      <div>Found {props.itemCount} results.</div>
      */
    }
}

MessageBar.propTypes = {
  itemCount: PropTypes.int,
  t: PropTypes.func,
}


export default withTranslation() (MessageBar);
