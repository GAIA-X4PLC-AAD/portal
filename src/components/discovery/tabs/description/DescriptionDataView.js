import React from "react";
import * as S from '../style';
import PropTypes from 'prop-types';
import {ColumnItem} from './DescriptionTabView';
import { withTranslation } from "react-i18next";

const DescriptionDataView = ({t, data}) => {
    const description = data ;


    const showElements = (elements) => {
        if (elements === undefined || elements === []) return;
        return (
            elements.map((elem, i) => {return (<S.Tag key={i}>{elem}</S.Tag>)})
        );

    }


    const showLocation= (location, location_flag) => {

      return (<>
                <S.FlagImg src={location_flag} alt={`${location} flag`}/>
                {location}
              </>);
    }

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
                  {showElements(description.tags)}
              </S.HorizontalContainer>
  
              <S.HorizontalContainer>
                <ColumnItem title={t('service-tile.source_UP')} subtitle={description.source} />
                <ColumnItem title={t('service-tile.cloud_service_UP')} subtitle={description.cloud_service} />
                <ColumnItem title={t('service-tile.frequency_of_update_UP')} subtitle={description.frequency_of_update} />
                <ColumnItem title={t('service-tile.last_update_UP')} subtitle={description.last_updated} />
                <ColumnItem title={t('service-tile.location_UP')} subtitle={showLocation(description.location, description.location_flag)} />
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
