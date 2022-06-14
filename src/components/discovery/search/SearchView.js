import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row, Style } from "../../../common/styles";
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
                <Style maxWidth='313px'>
                    <SearchFilterFactory type={type} />
                </Style>

                <Padding horizontal='12px' />
                <Style maxWidth='900px'>
                    <SearchContent type={type} />
                </Style>

            </Row>
        </>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;