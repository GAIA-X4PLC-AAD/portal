import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';


import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


import i18next from 'i18next';

import * as S from './style';
import { BodyText, ButtonText, Card, Circle, DropDownArrowDownSmall, H4LightText, HorizontalLine, Image, OutlineButton, Row, Style } from '../../common/styles';
import { Padding } from '../discovery/tabs/style';

const buildIdentifyServiceProvider = ({ background = '#fff', name, icon, code }) => {
  return (
    <Padding vertical='8px'>
      <Card background={background} borderColor='#E9E9E9' onClick={() => changeLanguage({ _lang: code })}>
        <Padding vertical='4px' horizontal='16px'>
          <Row>
            <Circle radius='56px' borderColor='#0' background='#C4C4C4'>{code}</Circle>
            {/* <Image src={`/images/${icon}`} /> */}
            <Padding paddingLeft='16px' />
            <ButtonText color='#000000'>{name}</ButtonText>
            <Padding paddingLeft='148px' />
          </Row>
        </Padding>
      </Card>
    </Padding>
  )
}

const changeLanguage = ({ _lang }) => {
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


  // language modal
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);


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
            <MenuItem onClick={onOpenModal} >
              {t('left-menu.change-language')}
            </MenuItem>
          </Menu>
          <DropDownArrowDownSmall />
        </Row>

        <Modal open={openModal} onClose={onCloseModal} center showCloseIcon={false}>
          <H4LightText>{t('left-menu.choose-language')}</H4LightText>
          <BodyText>{t('left-menu.select-system-language')}</BodyText>
          <HorizontalLine />

          <Padding vertical='20px' horizontal='40px'>
            {buildIdentifyServiceProvider({ background: _isEn ? '#46DAFF1F' : '#fff', name: 'English', code: 'en' })}
            {buildIdentifyServiceProvider({ background: _isEs ? '#46DAFF1F' : '#fff', name: 'Spanish', code: 'es' })}
            {/* {buildIdentifyServiceProvider({ background: '#fff', name: 'Deutsch', code: 'de' })} */}
            <Padding paddingTop='30px'/>
            <Row><OutlineButton onClick={onCloseModal}>{t('left-menu.close')}</OutlineButton></Row>
          </Padding>

        </Modal>

      </S.TopMenuLinks>
    </>
  )
}

export default CenterBar
