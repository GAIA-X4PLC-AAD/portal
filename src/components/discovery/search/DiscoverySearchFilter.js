import React from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import SearchFilterView from "./SearchFilterView";

const DiscoverySearchFilter = ({type}) => {
    
    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/filter-criterias`;

    return (
        <LoadingView
        url={URL}
        successView={SearchFilterView} key={type}/>
    );

}
DiscoverySearchFilter.propTypes = {
    type: PropTypes.string
};

export default DiscoverySearchFilter;
