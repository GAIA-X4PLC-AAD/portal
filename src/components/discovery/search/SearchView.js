import React  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";

const SearchView = ({type}) => {

    return (
        <SearchFilterFactory type={type}/>
    )
}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;