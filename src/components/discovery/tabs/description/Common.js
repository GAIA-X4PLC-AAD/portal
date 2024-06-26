import PropTypes from 'prop-types';
import React from 'react';

import { Tag } from '../../../../common/styles';
import * as S from '../style';

export const ShowElements = (elements) => {
  if (elements === undefined || elements === []) {return;}
  return (
    elements.map((elem, i) => {return (<Tag key={i}>{elem}</Tag>)})
  );

}
ShowElements.propTypes = {
  elements: PropTypes.array.isRequired
}

export const ShowLocation= (location, location_flag) => {
  return (<>
    <S.FlagImg src={location_flag} alt={`${location} flag`}/>
    {location}
  </>);
}
ShowLocation.propTypes = {
  location: PropTypes.string.isRequired,
  location_flag: PropTypes.string.isRequired
}

export const ColumnItem = ({ title, subtitle }) => {
  return <>
    <S.Padding vertical='20px' horizontal='4px'>
      <S.VerticalContainer>
        <S.Subtitle>{title}</S.Subtitle>
        <S.Body>{subtitle}</S.Body>
      </S.VerticalContainer>
    </S.Padding>
  </>
}

ColumnItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any.isRequired,
}
