import { withTranslation } from "react-i18next";
import React from 'react';

import PropTypes from 'prop-types';

const ServiceTileContact = (props) => {

    return (
        <div className="service-tile-contact">
            Placeholder - Contact  {props.serviceId}
        </div>
    );

}

ServiceTileContact.propTypes = {
    serviceId: PropTypes.string,
}

export default withTranslation() (ServiceTileContact);