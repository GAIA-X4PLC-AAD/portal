/* test coverage not required */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { updateFilterCriteria, updateSearchFromHome } from '../../../actions';
import { Circle, Column, Row } from '../../../common/styles';

import * as S from './style';

const SearchTerm = ({ t, type, inputWidth = '800px', advancedTextColor = '#000094', advancedSearchBgColor = '#000094', displayAsColumn = true }) => {

  // eslint-disable-next-line no-unused-vars
  const API_TYPE = (type) => {
    switch (type) {
    case 'home':
    case 'solution_pkg': return 'services';
    default: return type;
    }
  }

  const criteria = useSelector(state => state.searchCriteriaStore);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [advance, setAdvance] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [chips, setChips] = useState([]); // const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${API_TYPE(type)}/suggestions?searchTerm=${encodeURIComponent(searchTerm)}`;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (type != "management" && type != "participant") {
  //         callApi();
  //     }
  // }, [advance]);

  useEffect(() => {
    if (criteria.type === 'home') {
      setSearchTerm(criteria.searchTerms);
    }
  }, []);

  useEffect(
    () => {
      // eslint-disable-next-line no-unused-vars
      const chipAdded = chips.reduce((chipAdded, chip) => {
        if (chipAdded) {return chipAdded;}
        if (searchTerm.includes(chip.term)) {return true;}
        return false;
      }, false);
      // if (chipAdded || searchTerm === '') {
      //     if (type != "management" && type != "participant") {
      //         callApi();
      //     }
      // }
    }
    , [searchTerm]);

  // const callApi = () => {
  //     axios.get(URL).then(res => {
  //         setChips(res.data.results);
  //     });
  // }
  const doSearch = () => {
    if (type === 'home') {
      dispatch(updateSearchFromHome(searchTerm));
      navigate('/service-offerings');
    } else {
      dispatch(updateFilterCriteria({ searchTerms: searchTerm }))
    }
  }

  const addChipToSearch = (chip) => {
    setSearchTerm(`${searchTerm} ${chip.term}`);
  }

  // eslint-disable-next-line no-unused-vars
  const showAdvanceMessage = (advance, displayAbsolute = false) => {
    if (type === 'management' || type === 'participant') {return null;}
    if (advance === false) {
      return (
        <S.AdvancedSearch color={advancedTextColor}
          displayAbsolute={displayAbsolute}
          onClick={() => setAdvance(true)}
          data-tip={t('home.tooltip.advanced_search')}
        >
          {t('discovery.search.advance')}
        </S.AdvancedSearch>
      );
    }
  }

  // eslint-disable-next-line no-unused-vars
  const showAdvanceSearchChip = (advance) => {
    if (type === 'management' || type === 'participant') {return null;}
    if (advance === true) {
      return chips.map(
        (chip) => {
          return (
            <S.AdvancedSearch
              color={advancedTextColor}
              onClick={() => { addChipToSearch(chip) }}
              key={chip.label}
              data-tip={t('home.tooltip.chip')}
            >{chip.label}
            </S.AdvancedSearch>
          )
        }
      );
    }
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      doSearch();
    }
  }
  const searchMargin = (type) => {
    switch (type) {
    case 'management':
    case 'participant':
      return '0 0 24px auto';
    case 'home':
      return '0 auto 0 auto';
    default:
      return '0 0 0 auto';
    }
  }

  const _searchViews =
        <>
          <Row position='relative'>
            {displayAsColumn ? '' : <S.AdvancedSearchText color='white'>{t('discovery.search.text')}</S.AdvancedSearchText>}
            <S.SearchTerm type="text" width={inputWidth} onKeyPress={onKeyPress} value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
              data-tip={t('home.tooltip.search_terms')}
            />
            <S.SearchPlusButton
              onClick={doSearch}
              data-tip={t('home.tooltip.search')}
            >
              <Circle background={advancedSearchBgColor} radius='46px' borderRadius='4px' borderColor={advancedSearchBgColor}>
                <S.SearchPlusImage />
              </Circle>
            </S.SearchPlusButton>
            {/*{displayAsColumn ? '' : showAdvanceMessage(advance, !displayAsColumn)}*/}
          </Row>
          {/*<Row height='28px' justifyContent='left' alignItems='space-equally' alignSelf='end' >*/}
          {/*    /!* <Padding horizontal={displayAsColumn ? '0px' : '12px'}>{showAdvanceSearchChip(advance)}</Padding> *!/*/}
          {/*    {displayAsColumn ? showAdvanceMessage(advance) : null}*/}
          {/*    {showAdvanceSearchChip(advance)}*/}
          {/*</Row>*/}
        </>

  const justify = displayAsColumn ? 'left' : 'center';
  const align = displayAsColumn ? 'end' : 'center';
  const width = displayAsColumn ? 'auto' : 'fit-content';

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <Column key={type} margin={searchMargin(type)} width={width} alignItems={align} justifyContent={justify}>
        {_searchViews}
      </Column>
    </>
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
