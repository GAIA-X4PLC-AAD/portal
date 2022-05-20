import React from "react";
import PriceWidgetFactory from "./PriceWidgetFactory";
import PropTypes from 'prop-types';
import LoadingView from "../../../loading_view/LoadingView";
import configData from "../../../../config/config.json";

const PriceTab = ( { id, type} ) => {


        const URL = configData.EDGE_API_URI + `/discovery/${type}/${id}/price/`;
        
        return (
            <LoadingView
                url={URL}
                successView={PriceWidgetFactory}/>
        );
        
    
    };
    
    PriceTab.propTypes = {
        id: PropTypes.string,
        type: PropTypes.string
    }

export default PriceTab;