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
import buildLanguageItemView from '../../common/language_item';


const CenterBar = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const _lang = i18n['language']

  const _isEn = _lang.indexOf('en') == 0
  const _isEs = _lang.indexOf('es') == 0
  const _isDe = _lang.indexOf('de') == 0

  const _userRole = useSelector((state) => state.user.user.user_role)
  const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn)

  const _isPpr = _userRole == 'gaiax-ppr' && isUserSignedIn
  const _isPcr = _userRole == 'gaiax-pcr' && isUserSignedIn
  const _isFr = _userRole == 'gaiax-fr' && isUserSignedIn

  // language modal
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  // selected page
  const [selectedPage, setSelectedPage] = useState(-1);


  return (
    <>
      <S.TopMenuLinks>

        {/* DASHBOARD: 0 */}
        {(_isPpr || _isPcr) ?
          <ButtonText selected={selectedPage == 0} color='#000000' onClick={() => { navigate('/dashboard'); setSelectedPage(0); }}>{t('left-menu.dashboard')}</ButtonText> : ''}

        {/* ADMIN: 1 */}
        {_isFr ?
          <ButtonText selected={selectedPage == 1} color='#000000' onClick={() => { navigate('/admin/participant'); setSelectedPage(1); }}>{t('left-menu.admin')}</ButtonText> : ''}

        {/* SERVICES: 2 */}
        <ButtonText selected={selectedPage == 2} color='#000000' onClick={() => { navigate('/services'); setSelectedPage(2); }}>{t('left-menu.services')}</ButtonText>

        {/* DATA: 3 */}
        <ButtonText selected={selectedPage == 3} color='#000000' onClick={() => { navigate('/data'); setSelectedPage(3) }}>{t('left-menu.data')}</ButtonText>

        {/* PROVIDER: 4 */}
        <ButtonText selected={selectedPage == 4} color='#000000' onClick={() => { navigate('/provider'); setSelectedPage(4) }}>{t('left-menu.provider')}</ButtonText>

        {/* PROVIDE: 5 */}
        {_isPpr ?
          <ButtonText selected={selectedPage == 5} color='#000000' onClick={() => { navigate('/provide'); setSelectedPage(5) }}>{t('left-menu.provide')}</ButtonText> : ''}

        <Row>
          <Menu menuButton={<ButtonText color='#000000'>{t('left-menu.help')}</ButtonText>} menuClassName="szh-menu">
            <MenuItem>{t('left-menu.about')}</MenuItem>
            <MenuItem>{t('left-menu.support')}</MenuItem>
          </Menu>
          <DropDownArrowDownSmall />
        </Row>

        {isUserSignedIn ? <></> : <ButtonText color='#000000' onClick={onOpenModal}>{t('left-menu.change-language')}</ButtonText>}

        <Modal open={openModal} onClose={onCloseModal} center showCloseIcon={false}>
          <H4LightText>{t('left-menu.choose-language')}</H4LightText>
          <BodyText>{t('left-menu.select-system-language')}</BodyText>
          <HorizontalLine />

          <Padding vertical='20px' horizontal='40px'>
            {buildLanguageItemView({ background: _isEn ? '#46DAFF1F' : '#fff', name: 'English', code: 'en' })}
            {buildLanguageItemView({ background: _isEs ? '#46DAFF1F' : '#fff', name: 'Spanish', code: 'es' })}
            {buildLanguageItemView({ background: _isDe ? '#46DAFF1F' : '#fff', name: 'German', code: 'de' })}

            <Padding paddingTop='30px' />
            <Row><OutlineButton onClick={onCloseModal}>{t('left-menu.close')}</OutlineButton></Row>
          </Padding>

        </Modal>

      </S.TopMenuLinks>
    </>
  )
}

export default CenterBar
