import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import * as S from '../style';

import { ColumnItem, ShowElements, ShowLocation } from './Common';

const DescriptionPprView = ({ t, data }) => {
  const description = data ;

  if (data === undefined) {return null;}
  else {return (
    <>
      <S.ExpandedContainer>
        <S.VerticalContainer horizontal='8px'>
          <S.Padding horizontal='8px'>
            <S.Title>{t('service-tile.description')}</S.Title>
            <S.Body>{description.description}</S.Body>

            <S.Padding vertical='8px' horizontal='0px'>
              <S.Subtitle>{t('service-tile.certificates')}</S.Subtitle>
            </S.Padding>

            <S.HorizontalContainer>
              {ShowElements(description.certificates)}
            </S.HorizontalContainer>

            <S.HorizontalContainer>
              <ColumnItem title={t('service-tile.member_since_UP')} subtitle={description.member_since} />
              <ColumnItem title={t('service-tile.last_update_UP')} subtitle={description.last_updated} />
              <ColumnItem title={t('service-tile.location_UP')} subtitle={ShowLocation(description.location, description.location_flag)} />
            </S.HorizontalContainer>
          </S.Padding>
        </S.VerticalContainer>

      </S.ExpandedContainer>
    </>

  );}

}

DescriptionPprView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object,
  t: PropTypes.func
}

export default withTranslation () (DescriptionPprView);
