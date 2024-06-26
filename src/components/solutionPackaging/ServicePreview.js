import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as S from '../../common/styles';

import ServiceModalDetails from './ServiceModalDetails';
import { SlotBox } from './style';

const ServicePreview = ({ service , onSelect }) => {
  const { t } = useTranslation();
  const [displayModal, setDisplayModal] = useState(false);

  const onSelectFunction = () => {
    onSelect(service);
  }
  const openLink =  (url) => {
    window.open(url, '_blank').focus();
  }
  const closeModal = () => {
    setDisplayModal(false);
  }
  return (
    <>
      <SlotBox width='306px' justifyContent="start">
        <S.Column height="100%" justifyContent="start">
          <S.Style marginBottom="auto" textAlign="left">
            <S.Image src={service.img_preview_url} alt={service.name} width='281px' height='128px'/>
            <S.H4Text>{service.name}</S.H4Text>
            <S.BlueLinkText><S.Style textAlign="left" onClick={()=>{openLink(service.ppr_url)}}>{service.ppr_name}</S.Style></S.BlueLinkText>
            <S.Style marginTop="10px">
              <S.BodySmallText>{service.description}</S.BodySmallText>
            </S.Style>
          </S.Style>
          <S.Row margin="0 auto 0 0">
            <S.CancelButtonSmall onClick={()=>setDisplayModal(true)}>
              {t('solution_pkg.details')}
            </S.CancelButtonSmall>
            <S.BlueButtonSmall onClick={onSelectFunction}>
              {t('solution_pkg.select')}
            </S.BlueButtonSmall>
          </S.Row>
        </S.Column>
        {displayModal?<ServiceModalDetails service={service} closeModal={closeModal} onSelect={onSelectFunction}/>:null}
      </SlotBox>
    </>
  );
}
ServicePreview.propTypes = {
  service: PropTypes.object,
  onSelect: PropTypes.func
}

export default ServicePreview;
