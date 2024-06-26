import PropTypes from 'prop-types';
import React from 'react';

import LoadingView from '../../../loading_view/LoadingView';

import SampleRecordFactory from './SampleRecordFactory';

const SampleRecordTab = ( { id } ) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/data/${id}/sample-records/`;

  return (
    <LoadingView
      url={URL}
      successView={SampleRecordFactory}/>
  );

};

SampleRecordTab.propTypes = {
  id: PropTypes.string
}

export default SampleRecordTab;
