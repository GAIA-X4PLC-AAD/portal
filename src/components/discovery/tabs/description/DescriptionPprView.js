import React from "react";
import * as S from '../style';
import PropTypes from 'prop-types';
import {ColumnItem} from './DescriptionTabView';

const DescriptionPprView = ({data}) => {
    const data2 = {  description: "String",  certificates: ["String", "String"], location: "String", location_flag: "URL to flag image", member_since: "date/String", last_updated: "date/String"  }
    const description = data || data2;


    const showCertificates = (certificates) => {
        if (certificates === undefined || certificates === []) return;
        return (
            certificates.map((cert, i) => {return (<S.Tag key={i}>{cert}</S.Tag>)})
        );

    }

    if (data === undefined) return null;
    else return (
          <>
        <S.ExpandedContainer>
          <S.VerticalContainer horizontal='8px'>
            <S.Padding horizontal='8px'>
              <S.Title>Description</S.Title>
              <S.Body>{description.description}</S.Body>
  
              <S.Padding vertical='8px' horizontal='0px'>
                <S.Subtitle>Certificates</S.Subtitle>
              </S.Padding>
  
              <S.HorizontalContainer>
                  {showCertificates(description.certificates)}
              </S.HorizontalContainer>
  
              <S.HorizontalContainer>
                <ColumnItem title='MEMBER SINCE' subtitle={description.member_since} />
                <ColumnItem title='LAST UPDATE' subtitle={description.last_updated} />
                <ColumnItem title='LOCATION' subtitle={description.location} />
              </S.HorizontalContainer>
            </S.Padding>
          </S.VerticalContainer>
  
        </S.ExpandedContainer>
      </>

    );

}

DescriptionPprView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object
}

export default DescriptionPprView;
