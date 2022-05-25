
import React, { useState, useRef, useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';
import LoadingView from "../../../loading_view/LoadingView";
import DescriptionTabView from "./DescriptionTabView";
import configData from "../../../../config/config.json";


const DescriptionTab = ({ serviceId },) => {
  const URL = configData.EDGE_API_URI + `/discovery/services/${serviceId}/details/`;

  return (
    <LoadingView
      url={URL}
      successView={DescriptionTabView}
    />
  )
}

DescriptionTab.propTypes = {
  serviceId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTab
