import PropTypes from 'prop-types';
import React from 'react';
import '../../../../common/styles';

import LoadingViewDeprecated from '../../../../common/components/loadingIndicator/LoadingViewDeprecated';

import ScreenshotsTabView from './ScreenshotsTabView';

const ScreenshotsTab = ({ serviceId },) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/${serviceId}/screenshots/`;

  return (
    <LoadingViewDeprecated
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
