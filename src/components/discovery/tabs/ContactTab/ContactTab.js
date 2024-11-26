import PropTypes from 'prop-types';
import React from 'react';

import LoadingViewDeprecated from '../../../../common/components/loadingIndicator/LoadingViewDeprecated';

import ContactWidgetFactory from './ContactWidgetFactory';

const ContactTab = ( { id, type } ) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/${id}/contacts/`;

  return (
    <LoadingViewDeprecated
      url={URL}
      successView={ContactWidgetFactory}/>
  );

};

ContactTab.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
}
export default ContactTab;
