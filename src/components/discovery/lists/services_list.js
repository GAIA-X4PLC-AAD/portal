
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import PageListView from "./page_list_view";


const ServicesList = ( { pageNumber } ) => {


    return (
        <PageListView
        type={'services'}
        pageNumber={1}/>
    );

};

ServicesList.propTypes = {
    pageNumber: PropTypes.number,
}

export default ServicesList;