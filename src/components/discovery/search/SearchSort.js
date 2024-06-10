import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { updateFilterCriteria } from '../../../actions';
import { BlueLinkText, Style } from '../../../common/styles';

import { FloatRight } from './style';

const SearchSort = ({ type, data }) => {

  const { t } = useTranslation();
  const criteria = useSelector(state => state.searchCriteriaStore);
  const [direction, setDirection] = useState(criteria.sort_direction || 'ASC');
  const dispatch = useDispatch();

  // Reset direction when you move from different type (service, data, provider, management, participant)
  useEffect (()=> {
    if (type != criteria.type)
    {setDirection('ASC');}
  }, []);

  useEffect (()=> {
    if (direction != criteria.sort_direction)
    {dispatch(updateFilterCriteria({ sort_direction: direction }));}
  }, [direction]);

  const changeSortDirection = () =>{
    switch (direction) {
    case 'ASC':
      setDirection('DESC');
      break;
    case 'DESC':
      setDirection('ASC');
      break;
    }
  }
  // it should not be displayed in solution package
  if (type !== 'participant' && type !== 'management') {return null;}
  // do not show sort when there is no data
  if (!data || !data.data || data.data.length === 0) {return null;}
  return (
    <Style marginLeft='auto' marginRight='0' maxWidth='fit-content' key={type} height='8px'>
      <FloatRight>
        <BlueLinkText onClick={changeSortDirection}>{t(`admin.sort-direction-${direction}`)} </BlueLinkText>
      </FloatRight>
    </Style>
  );

}
SearchSort.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
}

export default SearchSort;
