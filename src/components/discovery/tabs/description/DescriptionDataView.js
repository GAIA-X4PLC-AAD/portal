import React from "react";
import * as S from '../style.js';
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";
import { ColumnItem, ShowElements, ShowLocation } from "./Common.js";

const DescriptionDataView = ({t, data}) => {
    const description = data ;

    if (data === undefined) return null;
    else return (
          <>
        <S.ExpandedContainer>
          <S.VerticalContainer horizontal='8px'>
            <S.Padding horizontal='8px'>
              <S.Title>{t('service-tile.description')}</S.Title>
              <S.Body>{description.description}</S.Body>
  
              <S.Padding vertical='8px' horizontal='0px'>
                <S.Subtitle>{t('service-tile.tags')}</S.Subtitle>
              </S.Padding>
  
              <S.HorizontalContainer>
                  {ShowElements(description.tags)}
              </S.HorizontalContainer>
  
              <S.HorizontalContainer>
                <ColumnItem title={t('service-tile.source_UP')} subtitle={description.source} />
                <ColumnItem title={t('service-tile.cloud_service_UP')} subtitle={description.cloud_service} />
                <ColumnItem title={t('service-tile.frequency_of_update_UP')} subtitle={description.frequency_of_update} />
                <ColumnItem title={t('service-tile.last_update_UP')} subtitle={description.last_updated} />
                <ColumnItem title={t('service-tile.location_UP')} subtitle={ShowLocation(description.location, description.location_flag)} />
                <ColumnItem title={t('service-tile.category_UP')} subtitle={description.category} />
              </S.HorizontalContainer>
            </S.Padding>
          </S.VerticalContainer>
  
        </S.ExpandedContainer>
      </>

    );

}

DescriptionDataView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object,
  t: PropTypes.func
}

export default withTranslation () (DescriptionDataView);
