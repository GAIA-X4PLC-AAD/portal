import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterCriteria } from "../../../actions";
import * as S from "./style";
import { ButtonText, Circle, Column, Padding, Row, Style } from "../../../common/styles";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import axios from "axios";

const SearchTerm = ({ t, type, inputWidth = '800px', advancedTextColor = '#000094', advancedSearchBgColor = '#000094', displayAsColumn = true }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const [searchTerm, setSearchTerm] = useState('');
    const [advance, setAdvance] = useState(false);
    const [chips, setChips] = useState([]);
    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/suggestions?searchTerm=${encodeURIComponent(searchTerm)}`;

    const dispatch = useDispatch();

    useEffect(()=>{
        callApi();
    }, [advance]);

    useEffect(
        ()=>{
            const chipAdded = chips.forEach(chip => {if(searchTerm.includes(chip.term)) return true}) || false;
            if(!chipAdded) callApi();
        }
    , [searchTerm]);

    useEffect(() => {
        if (criteria.type === 'home') {
            setSearchTerm(criteria.searchTerms);
        }
    }, []);

    const callApi = () => {
        axios.get(URL).then(res => {
            setChips(res.data.results);
        });
    }
    const doSearch = () => {
        dispatch(updateFilterCriteria({ searchTerms: searchTerm }))
    }

    const addChipToSearch = (chip) => {
        setSearchTerm(`${searchTerm} ${chip.term}`);
    }

    const showAdvanceSearchChip = (advance) => {
        if (type === 'management' || type === 'participant') return null;
        if (advance === false) {
            return (<S.AdvancedSearch color={advancedTextColor} onClick={() => setAdvance(true)}>{t("discovery.search.advance")}</S.AdvancedSearch>);
        } else {
            return chips.map((chip) => { return (<S.AdvancedSearch color={advancedTextColor} onClick={() => { addChipToSearch(chip) }} key={chip}>{chip.label}</S.AdvancedSearch>) });
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
            <Row alignItems='space-equally'>
                {/* <Padding horizontal={displayAsColumn ? '0px' : '12px'}>{showAdvanceSearchChip(advance)}</Padding> */}
                {showAdvanceSearchChip(advance)}
            </Row>
        </>

    return (
        displayAsColumn ?
            <Column key={type} margin={searchMargin(type)} alignItems='end' justifyContent='left'>
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