import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import SearchContent from "./SearchContent";
import SearchTerm from "./SearchTerm";
import { useDispatch } from "react-redux";
import { updateSearchType } from "../../../actions";

const SearchView = ({type}) => {
    

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(updateSearchType(type));
    },[type]);

    return (
        <>
        <SearchTerm key={type}/>
        <SearchFilterFactory type={type}/>
        <SearchContent type={type}/>
        </>
    )
}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;