import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row } from "../../../common/styles";
import { Padding } from "../tabs/style";
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
            <Row margin="0 0 0 auto" width="fit-content">
                <SearchTerm key={type}/>
            </Row>
            <Row>
                <SearchFilterFactory type={type}/>
                <Padding horizontal='12px'/>
                <SearchContent type={type}/>
            </Row>
        </>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;