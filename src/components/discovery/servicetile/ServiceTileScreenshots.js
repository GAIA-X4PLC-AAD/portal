import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

const ServiceTileScreenshots = (props) => {
  return (
    <div className="service-tile-screenshots">
            Placeholder - Screenshots  {props.serviceId}
    </div>
  );
}

ServiceTileScreenshots.propTypes = {
  serviceId: PropTypes.string,
}

export default withTranslation()(ServiceTileScreenshots);
