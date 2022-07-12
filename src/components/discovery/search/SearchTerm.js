import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterCriteria } from "../../../actions";
import * as S from "./style";
import { ButtonText, Circle, Column, Padding, Row } from "../../../common/styles";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const SearchTerm = ({ t, type, inputWidth = '800px', advancedTextColor = '#000094', advancedSearchBgColor = '#000094', displayAsColumn = true }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const [searchTerm, setSearchTerm] = useState('');
    const [advance, setAdvance] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(`type of criteria.type = ${criteria.type} , type= ${type}, searchSterm = ${criteria.searchTerms}`);
        if (criteria.type === 'home') {
            setSearchTerm(criteria.searchTerms);
        }
    }, []);

    const doSearch = () => {
        dispatch(updateFilterCriteria({ searchTerms: searchTerm }))
    }

    const addChipToSearch = (chip) => {
        setSearchTerm(`${searchTerm} ` + t(`discovery.search.chip.filter.${chip}`));
    }

    const showAdvanceSearchChip = (advance) => {
        if (type === 'management' || type === 'participant') return null;
        const chips = ['not', 'provider', 'storage', 'service', 'compute'];
        if (advance === false) {
            return (<S.AdvancedSearch color={advancedTextColor} onClick={() => setAdvance(true)}>{t("discovery.search.advance")}</S.AdvancedSearch>);
        } else {
            return chips.map((chip) => { return (<S.AdvancedSearch color={advancedTextColor} onClick={() => { addChipToSearch(chip) }} key={chip}>{t(`discovery.search.chip.text.${chip}`)}</S.AdvancedSearch>) });
        }
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    }
    const searchMargin = (type) => {
        if (type === 'management' || type === 'participant') return '0 0 24px auto';
        return '0 0 0 auto';
    }

    const _searchViews =
        <>
            { displayAsColumn ? '': <S.AdvancedSearchText color='white'>Search for lorem ipsum</S.AdvancedSearchText> }
            <Row>
                <S.SearchTerm type="text" width={inputWidth} onKeyPress={onKeyPress} value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
                <S.SearchPlusButton onClick={doSearch}><Circle background={advancedSearchBgColor} radius='46px' borderRadius='4px' borderColor={advancedSearchBgColor}><S.SearchPlusImage /></Circle></S.SearchPlusButton>
            </Row>
            <Row>
                <Padding horizontal={displayAsColumn ? '0px' : '12px'}>{showAdvanceSearchChip(advance)}</Padding>
            </Row>
        </>

    return (
        displayAsColumn ?
            <Column key={type} margin={searchMargin(type)} alignItems='center' justifyContent='center'>
                {_searchViews}
            </Column> :
            <Row key={type} margin={searchMargin(type)} alignItems='center' justifyContent='center'>
                {_searchViews}
            </Row>
    );

}
SearchTerm.propTypes = {
    t: PropTypes.func,
    type: PropTypes.string,
    inputWidth: PropTypes.string,
    advancedTextColor: PropTypes.string,
    advancedSearchBgColor: PropTypes.string,
    displayAsColumn: PropTypes.bool,
}


export default withTranslation()(SearchTerm);