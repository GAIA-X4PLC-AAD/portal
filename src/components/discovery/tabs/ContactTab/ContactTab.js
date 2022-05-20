import configData from "../../../../config/config.json";
import React from "react";
import PropTypes from 'prop-types';
import LoadingView from "../../../loading_view/LoadingView";
import ContactWidgetFactory from "./ContactWidgetFactory";

const ContactTab = ( { id, type } ) => {

    const URL = configData.EDGE_API_URI + `/discovery/${type}/${id}/contacts/`;
    
    return (
        <LoadingView
        url={URL}
        successView={ContactWidgetFactory}/>
    );
    

};

ContactTab.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string
}
export default ContactTab;