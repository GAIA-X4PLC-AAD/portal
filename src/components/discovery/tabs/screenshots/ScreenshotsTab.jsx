import React, { useState, useRef, useEffect } from "react";


import '../../../../common/styles';

import PropTypes from 'prop-types';
import ScreenshotsTabView from "./ScreenshotsTabView";
import LoadingView from "../../../loading_view/LoadingView";


const ScreenshotsTab = ({ serviceId },) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/${serviceId}/screenshots/`;

  return (
    <LoadingView
      url={URL}
      successView={ScreenshotsTabView}
    />
  )
}

ScreenshotsTab.propTypes = {
  data: PropTypes.object.isRequired,
  serviceId: PropTypes.number.isRequired,
}

export default ScreenshotsTab
