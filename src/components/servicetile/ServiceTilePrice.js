import { withTranslation } from "react-i18next";
import React from 'react';
import PropTypes from 'prop-types';

const ServiceTilePrice = (props) => {

    return (
        <div className="service-tile-price">
            Placeholder - price  {props.serviceId}
        </div>
    );

}

ServiceTilePrice.propTypes = {
    serviceId: PropTypes.string,
}

export default withTranslation() (ServiceTilePrice);