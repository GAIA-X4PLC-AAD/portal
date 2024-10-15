import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSearchType, updateSeartTypeWithTerm } from '../../../actions';
import { Column, Row, Style } from '../../../common/styles';
import AdminHeader from '../../admin/AdminHeader';
import { Padding } from '../tabs/style';

import SearchContent from './SearchContent';
import SearchFilterFactory from './SearchFilterFactory';
import SearchTerm from './SearchTerm';

const SearchView = ({ type, onSelect, serviceId, slot }) => {

  const store = useSelector(state => state.searchCriteriaStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.type !== 'home')
    {dispatch(updateSearchType(type));}
    else {dispatch(updateSeartTypeWithTerm(type, store.searchTerms));}
  }, [type]);

  return (
    <React.Fragment key={type}>
      <Row>
        <Column>
          <Style maxWidth='313px'>
            <AdminHeader type={type} />
          </Style>
          <Style maxWidth='313px'>
            <SearchFilterFactory type={type} serviceId={serviceId} slot={slot}/>
          </Style>

        </Column>
        <Column maxWidth='100%'>
          {
            (type !== 'participant' && type !== 'management')
              ? <SearchTerm type={type} />
              : <></>
          }

          <Padding horizontal='12px' />
          <Style maxWidth='900px'>
            <SearchContent type={type} serviceId={serviceId} slot={slot} onSelect={onSelect} />
          </Style>

        </Column>
      </Row>
    </React.Fragment>

  );

}

SearchView.propTypes = {
  type: PropTypes.string,
  onSelect: PropTypes.func,
  serviceId: PropTypes.string,
  slot: PropTypes.number
}

export default SearchView;
