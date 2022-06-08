import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../../actions";
import * as S from "./style";
import {Column, Row} from "../../../common/styles";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const SearchTerm = ({t}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [advance, setAdvance] = useState(false);

    const dispatch = useDispatch();

    const doSearch = () => {
        dispatch(updateFilterCriteria({searchTerms: searchTerm}))
    }

    const addChipToSearch = (chip) => {
        setSearchTerm(`${searchTerm} `+ t(`discovery.search.chip.filter.${chip}`));
    }

    const showAdvanceSearchChip = (advance) => {
        const chips = ['not','provider','storage','service','compute'];
        console.log(advance);
        if(advance === false) {
            return (<S.AdvancedSearch onClick={()=>setAdvance(true)}>Advanced Search</S.AdvancedSearch>);
        } else {
            return chips.map((chip) => {return (<S.AdvancedSearch onClick={()=>{addChipToSearch(chip)}} key={chip}>{t(`discovery.search.chip.text.${chip}`)}</S.AdvancedSearch>)});
        }
    }
    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            doSearch();
        }
    }

    return (
            <Column>
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
    t: PropTypes.func
}


export default withTranslation() (SearchTerm);