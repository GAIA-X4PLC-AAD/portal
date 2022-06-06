import React, { useEffect, useState }  from "react";
import {  useSelector } from "react-redux";
import configData from "../../../config/config.json";  
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';

const SearchContent = ({type}) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const URL = configData.EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;

    const loadData = ({data}) => {
        console.log(data);
    }

    console.log(URL);
    return (<LoadingView url={URL}
        successView={loadData} key={URL}/>);
}

SearchContent.propTypes = {
    type: PropTypes.string
};


export default SearchContent;