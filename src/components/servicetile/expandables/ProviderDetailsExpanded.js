import React from 'react';
import BasicServiceDetailsExpanded from './BasicServiceDetaillsExpanded';

import PropTypes from 'prop-types';

const ProviderDetailsExpanded = ( { providerId } ) => {

  return (
    <>
      <BasicServiceDetailsExpanded showImage={false}/>
    </>
  )
}

ProviderDetailsExpanded.propTypes = {
  providerId: PropTypes.int,
}

export default ProviderDetailsExpanded


