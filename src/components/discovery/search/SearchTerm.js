import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../../actions";
import * as S from "./style";

const SearchTerm = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const doSearch = () => {
        dispatch(updateFilterCriteria({searchTerms: searchTerm}))
    }

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            doSearch();
        }
    }

    return (
    <>
            <S.Row>
                <S.SearchTerm type="text" onKeyPress={onKeyPress} value={searchTerm} onChange={(e)=> {setSearchTerm(e.target.value)}}/>
                <S.SearchPlusButton onClick={doSearch}><S.SearchPlusImage/></S.SearchPlusButton>     
            </S.Row>
            <S.Row>
                <S.AdvancedSearch>Advanced Search</S.AdvancedSearch>
            </S.Row>
    </>
        
    );

}

export default SearchTerm;