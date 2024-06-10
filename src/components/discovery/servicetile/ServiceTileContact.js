import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import ContactTab from './ContactTab/ContactTab';

const ServiceTileContact = (props) => {

  return (
    <ContactTab serviceId={props.serviceId}/>
  );

}

ServiceTileContact.propTypes = {
  serviceId: PropTypes.string,
}

export default withTranslation() (ServiceTileContact);
