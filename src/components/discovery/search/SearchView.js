import React  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import SearchContent from "./SearchContent";

const SearchView = ({type}) => {

    return (
        <>
        <SearchFilterFactory type={type}/>
        <SearchContent/>
        </>
    )
}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;