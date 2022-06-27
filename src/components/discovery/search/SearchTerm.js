import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterCriteria } from "../../../actions";
import * as S from "./style";
import {Column, Row} from "../../../common/styles";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const SearchTerm = ({t, type}) => {
    
    const criteria = useSelector(state => state.searchCriteriaStore);
    const [searchTerm, setSearchTerm] = useState('');
    const [advance, setAdvance] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(`type of criteria.type = ${criteria.type} , type= ${type}, searchSterm = ${criteria.searchTerms}`);
        if (criteria.type === 'home') {
            setSearchTerm(criteria.searchTerms);
        }
    },[]);

    const doSearch = () => {
        dispatch(updateFilterCriteria({searchTerms: searchTerm}))
    }

    const addChipToSearch = (chip) => {
        setSearchTerm(`${searchTerm} `+ t(`discovery.search.chip.filter.${chip}`));
    }

    const showAdvanceSearchChip = (advance) => {
        if (type === 'management' || type === 'participant') return null;
        const chips = ['not','provider','storage','service','compute'];
        if(advance === false) {
            return (<S.AdvancedSearch onClick={()=>setAdvance(true)}>{t("discovery.search.advance")}</S.AdvancedSearch>);
        } else {
            return chips.map((chip) => {return (<S.AdvancedSearch onClick={()=>{addChipToSearch(chip)}} key={chip}>{t(`discovery.search.chip.text.${chip}`)}</S.AdvancedSearch>)});
        }
    }
    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            doSearch();
        }
    }
    const searchMargin = (type) => {
        if (type === 'management' || type === 'participant') return '0 0 24px auto';
        return '0 0 0 auto';
    }

    return (
            <Column key={type} margin={searchMargin(type)}>
                <Row>
                    <S.SearchTerm type="text" onKeyPress={onKeyPress} value={searchTerm} onChange={(e)=> {setSearchTerm(e.target.value)}}/>
                    <S.SearchPlusButton onClick={doSearch}><S.SearchPlusImage/></S.SearchPlusButton>     
                </Row>
                <Row>
                    {showAdvanceSearchChip(advance)}
                </Row>
            </Column>
    );

}
SearchTerm.propTypes = {
    t: PropTypes.func,
    type: PropTypes.string
}


export default withTranslation() (SearchTerm);