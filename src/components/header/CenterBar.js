import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import * as S from './style';

const CenterBar = () => {

  const { t, } = useTranslation();

  return (
    <>
      <S.TopMenuLinks>
        <Link to="/admin/participant"> {t('left-menu.admin')}</Link>
        <Link to="/dashboard"> {t('left-menu.dashboard')}</Link>
        <Link to="/services"> {t('left-menu.services')}</Link>
        <Link to="/data"> {t('left-menu.data')}</Link>
        <Link to="/provider"> {t('left-menu.provider')}</Link>
      </S.TopMenuLinks>
    </>
  )
}

export default CenterBar
