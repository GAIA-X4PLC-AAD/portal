import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import i18next from 'i18next';
import * as S from './style.js';
import { BodyText, ButtonText, DropDownArrowDownSmall, H4LightText, HorizontalLine, OutlineButton, Row } from '../../common/styles.js';
import { Padding } from '../discovery/tabs/style.js';
import buildLanguageItemView from '../../common/language_item.js';

import { FR_ROLE, PPR_ROLE, PCR_ROLE, VR_ROLE } from '../../common/auth.js';

import history from "../../common/history.js";
import {Tooltip} from "react-tooltip";


const CenterBar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const _lang = i18n['language']

  const _isEn = _lang.indexOf('en') == 0
  const _isEs = _lang.indexOf('es') == 0
  const _isDe = _lang.indexOf('de') == 0

  const _userRole = useSelector((state) => state.user.user.user_role)

  const _isPpr = _userRole == PPR_ROLE
  const _isVr = _userRole == VR_ROLE

  const _isPcrUser = _userRole == PCR_ROLE
  const _isPcrOrg = _userRole == PPR_ROLE
  const _isFr = _userRole == FR_ROLE

  // language modal
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  return (
      <S.TopMenuLinks>

        {/* DASHBOARD: 0 */}
        {(_isPpr || _isPcrUser || _isPcrOrg)
            ?
            <>
              <ButtonText
                  $selected={location.pathname === '/dashboard'}
                  $color='#000000'
                  $fontSize='16px'
                  onClick={() => {
                    navigate('/dashboard');
                  }}
                  data-tooltip-id={'left-menu.tooltip.dashboard'}
                  data-tooltip-content={t('left-menu.tooltip.dashboard')}
              >
                {t('left-menu.dashboard')}
              </ButtonText>
              <Tooltip id={'left-menu.tooltip.dashboard'} />
            </>
            : ''
        }

        {/* ADMIN: 1 */}
        {_isFr
            ?
            <>
              <ButtonText
                  $selected={location.pathname.includes('admin')}
                  $color='#000094'
                  $fontSize='16px'
                  onClick={() => {
                    navigate('/admin/participant');
                  }}
                  data-tooltip-id={'left-menu.tooltip.admin'}
                  data-tooltip-content={t('left-menu.tooltip.admin')}
              >
                {t('left-menu.admin')}
              </ButtonText>
              <Tooltip id={'left-menu.tooltip.admin'} />
            </>

            : ''
        }

        {
          _isFr ? '' :
              <>
                {/* SERVICES: 2 */}
                <ButtonText
                    $selected={location.pathname === '/service-offerings'}
                    $color='#000094'
                    $fontSize='16px'
                    onClick={() => {
                      navigate('/service-offerings');
                    }}
                    data-tooltip-id={'left-menu.tooltip.service-offerings'}
                    data-tooltip-content={t('left-menu.tooltip.service-offerings')}
                >
                  {t('left-menu.service-offerings')}
                </ButtonText>

                <Tooltip id={'left-menu.tooltip.service-offerings'} place="top" />

                {/* PROVIDER: 4 */}
                <ButtonText
                    $selected={location.pathname === '/participants'}
                    $color='#000094'
                    $fontSize='16px'
                    onClick={() => {
                      navigate('/participants');
                    }}
                    data-tooltip-id={'left-menu.tooltip.participants'}
                    data-tooltip-content={t('left-menu.tooltip.participants')}
                >
                  {t('left-menu.participants')}
                </ButtonText>
                <Tooltip id={'left-menu.tooltip.participants'} />

                {/* DATA: 3 */}
                <ButtonText
                    $selected={location.pathname === '/resources'}
                    $color='#000094'
                    $fontSize='16px'
                    onClick={() => {
                      navigate('/resources');
                    }}
                    data-tooltip-id={'left-menu.tooltip.resources'}
                    data-tooltip-content={t('left-menu.tooltip.resources')}
                >
                  {t('left-menu.resources')}
                </ButtonText>
                <Tooltip id={'left-menu.tooltip.resources'} />

                {/* PROVIDE: 5 */}
                {_isPpr
                    ?
                    <>
                      <ButtonText
                          $selected={location.pathname.includes('/provide/')}
                          $color='#000094'
                          $fontSize='16px'
                          onClick={() => {
                            navigate('/provide/start');
                          }}
                          data-tooltip-id={'left-menu.tooltip.provide'}
                          data-tooltip-content={t('left-menu.tooltip.provide')}
                      >
                        {t('left-menu.provide')}
                      </ButtonText>
                      <Tooltip id={'left-menu.tooltip.provide'} place="top" />
                    </>
                    : ''
                }

              </>
        }
        <Row>
          <Menu menuButton={<ButtonText $color='#000094' $fontSize='16px'>{t('left-menu.help')}</ButtonText>}
                menuClassName="szh-menu">
            <MenuItem onClick={() => history.push('/help/about')}>{t('left-menu.about')}</MenuItem>
            <MenuItem onClick={() => history.push('/help/support')}>{t('left-menu.support')}</MenuItem>
          </Menu>
          <DropDownArrowDownSmall/>
        </Row>

        {
          (_userRole != VR_ROLE)
              ? <></>
              :
              <>
                <ButtonText
                    $color='#000094'
                    $fontSize='16px'
                    onClick={onOpenModal}
                    data-tooltip-id={'left-menu.tooltip.change-language'}
                    data-tooltip-content={t('left-menu.tooltip.change-language')}
                >
                  {t('left-menu.change-language')}
                </ButtonText>
                <Tooltip id={'left-menu.tooltip.change-language'} />
              </>
        }

        <Modal open={openModal} onClose={onCloseModal} center showCloseIcon={false}>
          <H4LightText>{t('left-menu.choose-language')}</H4LightText>
          <BodyText>{t('left-menu.select-system-language')}</BodyText>
          <HorizontalLine/>

          <Padding $vertical='20px' $horizontal='40px'>
            {buildLanguageItemView({background: _isEn ? '#46DAFF1F' : '#fff', name: 'English', code: 'en'})}
            {buildLanguageItemView({background: _isEs ? '#46DAFF1F' : '#fff', name: 'Spanish', code: 'es'})}
            {buildLanguageItemView({background: _isDe ? '#46DAFF1F' : '#fff', name: 'German', code: 'de'})}

            <Padding $paddingTop='30px' />
            <Row><OutlineButton onClick={onCloseModal}>{t('left-menu.close')}</OutlineButton></Row>
          </Padding>

        </Modal>

      </S.TopMenuLinks>
  )
}

export default CenterBar
