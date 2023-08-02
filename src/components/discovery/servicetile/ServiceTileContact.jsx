import { withTranslation } from "react-i18next";
import ContactTab from "./ContactTab/ContactTab";
import React from 'react';
import PropTypes from 'prop-types';

const ServiceTileContact = (props) => {


    return (
            <ContactTab serviceId={props.serviceId}/>
    );

}

ServiceTileContact.propTypes = {
    serviceId: PropTypes.string,
}

export default withTranslation() (ServiceTileContact);