import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import React from 'react';

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