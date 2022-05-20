import { withTranslation } from "react-i18next";
import PriceTab from "./priceTab/PriceTab";
import React from 'react';
import PropTypes from 'prop-types';

const ServiceTilePrice = (props) => {

    return (
        <div className="service-tile-price">
            <PriceTab serviceId={props.serviceId}/>
        </div>
    );

}

ServiceTilePrice.propTypes = {
    serviceId: PropTypes.string,
}

export default withTranslation() (ServiceTilePrice);