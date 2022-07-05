import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';


import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import i18next from 'i18next';

import * as S from './style';
import { ButtonText, DropDownArrowDownSmall, Row, Style } from '../../common/styles';


const changeLanguage = ({_lang}) => {
  i18next.changeLanguage(_lang, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key');
  });
}

const CenterBar = () => {

  const { t, i18n } = useTranslation();
  const _lang = i18n['language']

  const _isEn = _lang.indexOf('en') == 0
  const _isEs = _lang.indexOf('es') == 0

  // const _isPr = useSelector((state) => state.user.user.is_pr && state.isUserSignedIn)
  const _isPr = useSelector((state) => true)
  const navigate = useNavigate();

  <ButtonText>{t('left-menu.admin')}</ButtonText>

  return (
    <>
      <S.TopMenuLinks>

        {(_isPr) ? <ButtonText onClick={() => navigate('/dashboard')}>{t('left-menu.dashboard')}</ButtonText> : ''}

        <ButtonText onClick={() => navigate('/admin/participant')}>{t('left-menu.admin')}</ButtonText>

        <ButtonText onClick={() => navigate('/services')}>{t('left-menu.services')}</ButtonText>

        <ButtonText onClick={() => navigate('/data')}>{t('left-menu.data')}</ButtonText>

        <ButtonText onClick={() => navigate('/provider')}>{t('left-menu.provider')}</ButtonText>

        <ButtonText onClick={() => navigate('/account/provider/details')}>{t('left-menu.provide')}</ButtonText>

        <Row>
          <Menu menuButton={<ButtonText>{t('left-menu.help')}</ButtonText>} menuClassName="szh-menu">
            <MenuItem>{t('left-menu.about')}</MenuItem>
            <MenuItem>{t('left-menu.support')}</MenuItem>
            <SubMenu label={t('left-menu.change-language')}>
              <MenuItem onClick={() => changeLanguage({_lang: 'en'})}>{t('left-menu.english')} {_isEn ? '•' : ' '}</MenuItem>
              <MenuItem onClick={() => changeLanguage({_lang: 'es'})}>{t('left-menu.spanish')} {_isEs ? '•' : ' '} </MenuItem>
            </SubMenu>
          </Menu>
          <DropDownArrowDownSmall />
        </Row>

      </S.TopMenuLinks>
    </>
  )
}

export default CenterBar
