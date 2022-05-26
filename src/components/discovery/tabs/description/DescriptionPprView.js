import React from "react";
import * as S from '../style';
import PropTypes from 'prop-types';
import {ColumnItem} from './DescriptionTabView';
import { withTranslation } from "react-i18next";

const DescriptionPprView = ({t, data}) => {
    const description = data ;


    const showCertificates = (certificates) => {
        if (certificates === undefined || certificates === []) return;
        return (
            certificates.map((cert, i) => {return (<S.Tag key={i}>{cert}</S.Tag>)})
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
                <S.Subtitle>{t('service-tile.certificates')}</S.Subtitle>
              </S.Padding>
  
              <S.HorizontalContainer>
                  {showCertificates(description.certificates)}
              </S.HorizontalContainer>
  
              <S.HorizontalContainer>
                <ColumnItem title={t('service-tile.member_since_UP')} subtitle={description.member_since} />
                <ColumnItem title={t('service-tile.last_update_UP')} subtitle={description.last_updated} />
                <ColumnItem title={t('service-tile.location_UP')} subtitle={showLocation(description.location, description.location_flag)} />
              </S.HorizontalContainer>
            </S.Padding>
          </S.VerticalContainer>
  
        </S.ExpandedContainer>
      </>

    );

}

DescriptionPprView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object,
  t: PropTypes.func
}

export default withTranslation () (DescriptionPprView);
