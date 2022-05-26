import React, { useState, useRef, useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';
import LoadingView from "../../../loading_view/LoadingView";
import DescriptionTabView from "./DescriptionTabView";
import configData from "../../../../config/config.json";
import DescriptionPprView from "./DescriptionPprView";


const DescriptionTab = ({ id, type }) => {
  const URL = configData.EDGE_API_URI + `/discovery/${type}/${id}/details/`;


  const getSuccessView = (type) => {
      switch (type ) {
        case 'services': return DescriptionTabView;
        case 'ppr':  return DescriptionPprView;
        default: return DescriptionTabView;
      }
  }

  return (
    <LoadingView
      url={URL}
      successView={getSuccessView(type)}
    />
  )
}

DescriptionTab.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTab
