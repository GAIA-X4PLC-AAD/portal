import configData from "../../../config/config.json";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import ListView from "./list_view";
import LoadingView from "../../loading_view/LoadingView";


const PageListView = ( { type, pageNumber } ) => {

    // const URL = configData.EDGE_API_URI + `/discovery/${type}/${pageNumber}/`;
    const URL = `https://reqres.in/api/users?delay=1`;
    

    return (
        <LoadingView
        url={URL}
        successView={ListView}/>
    );

};

PageListView.propTypes = {
    type: PropTypes.string,
    pageNumber: PropTypes.number,
}

export default PageListView;