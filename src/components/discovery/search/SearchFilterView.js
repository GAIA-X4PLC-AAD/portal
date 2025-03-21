import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { updateFilterCriteria } from '../../../actions';
import ExpandableView from '../../expandable/ExpandableView';

import * as S from './style';

const SearchFilterView = ({ data, }) => {

  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation()

  // updates redux filterCriteria every 1s if something has been changed. When there is a change in between, will wait 1s again
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(updateFilterCriteria({ filterCriteria: filters }));
    }, 1000);
    return () => {
      clearTimeout(timerId);
    }
  }, [filters]);

  // update state of current filters
  const onFormChanged = (a) => {
    if (a.target.checked === true) {
      setFilters([...filters, { key: a.target.name, value: a.target.value }]);

    } else {
      setFilters(filters.filter(({ key, value }) => { return !(key === a.target.name && value === a.target.value) }));
    }
  }

  const showItemsList = (name, items) => {
    return (
    // returning as a single component, instead as an array (otherwise, will cause ExpandableView to its `view` to issue a console warning)
      <>
        {
          (items.map((item) => {
            return (
              <S.Column key={item.name} width="263px">
                <S.CheckBox type="checkbox" name={name} value={item.name}
                  defaultChecked={false} onChange={onFormChanged}
                  key={name}
                  data-tip={t('discovery.search.tooltip.category_item')}
                />
                <S.CheckBoxText>{item.name}</S.CheckBoxText>
                <S.Rounded>{item.qty}</S.Rounded>
              </S.Column>
            );
          }))
        }
      </>
    )
  };
  const showCategoryHeader = (name) => {
    return <S.Category>{name}</S.Category>;
  }

  const showCategories = (data) => {
    return (data.categories.map((cat, i) => {
      return <ExpandableView
        margin={'1px 0px'}
        initiallyExpanded={true}
        border={true}
        arrowColor={'#737373'}
        elevation={true}
        boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}
        titleTrailerPadding={'12px'}
        view={showItemsList(cat.name, cat.items)}
        title={showCategoryHeader(cat.name)} key={cat.name} />
    }))
  }

  // check when data is null
  if (data === undefined) {return null;}
  return <>
    <S.FilterHeader>{t('discovery.search.filter')}</S.FilterHeader>
    <S.Filters>
      {showCategories(data)}
    </S.Filters>
  </>
}

SearchFilterView.propTypes = {
  data: PropTypes.object,
};

export default withTranslation()(SearchFilterView);
