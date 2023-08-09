import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


import i18next from 'i18next';

import * as S from './style';
import { BodyText, ButtonText, DropDownArrowDownSmall, H4LightText, HorizontalLine, OutlineButton, Row } from '../../common/styles';
import { Padding } from '../discovery/tabs/style';
import buildLanguageItemView from '../../common/language_item';

import { FR_ROLE, PPR_ROLE, PCR_ROLE, VR_ROLE } from '../../common/auth';

import history from "../../common/history";
import ReactTooltip from 'react-tooltip';



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


  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <S.TopMenuLinks>

        {/* DASHBOARD: 0 */}
        {(_isPpr || _isPcrUser || _isPcrOrg)
          ?
          <ButtonText
            selected={location.pathname === '/dashboard'}
            color='#000000'
            onClick={() => { navigate('/dashboard'); }}
            data-tip={t('left-menu.tooltip.dashboard')}
          >
            {t('left-menu.dashboard')}
          </ButtonText>
          : ''
        }

        {/* ADMIN: 1 */}
        {_isFr
          ?
          <ButtonText
            selected={location.pathname.includes('admin')}
            color='#000000'
            onClick={() => { navigate('/admin/participant'); }}
            data-tip={t('left-menu.tooltip.admin')}
            >
              {t('left-menu.admin')}
          </ButtonText>
          : ''
        }

        {
          _isFr ? '' :
            <>
              {/* SERVICES: 2 */}
              <ButtonText selected={location.pathname === '/service-offerings'}
                color='#000000'
                onClick={() => { navigate('/service-offerings'); }}
                data-tip={t('left-menu.tooltip.service-offerings')}
                >
                  {t('left-menu.service-offerings')}
              </ButtonText>

              {/* DATA: 3 */}
              <ButtonText selected={location.pathname === '/resources'}
                color='#000000'
                onClick={() => { navigate('/resources'); }}
                data-tip={t('left-menu.tooltip.resources')}
                >
                  {t('left-menu.resources')}
              </ButtonText>

              {/* PROVIDER: 4 */}
              <ButtonText
                selected={location.pathname === '/participants'}
                color='#000000'
                onClick={() => { navigate('/participants'); }}
                data-tip={t('left-menu.tooltip.participants')}
                >
                  {t('left-menu.participants')}
              </ButtonText>

              {/* PROVIDE: 5 */}
              {_isPpr
                ?
                <ButtonText
                  selected={location.pathname.includes('/provide/')}
                  color='#000000' onClick={() => { navigate('/provide/start'); }}
                  data-tip={t('left-menu.tooltip.provide')}
                  >
                    {t('left-menu.provide')}
                </ButtonText>
                 : ''
              }

            </>
        }
        <Row>
          <Menu menuButton={<ButtonText color='#000000'>{t('left-menu.help')}</ButtonText>} menuClassName="szh-menu">
            <MenuItem onClick={() => history.push('/help/about')}>{t('left-menu.about')}</MenuItem>
            <MenuItem onClick={() => history.push('/help/support')}>{t('left-menu.support')}</MenuItem>
          </Menu>
          <DropDownArrowDownSmall />
        </Row>

        {
          (_userRole != VR_ROLE)
          ? <></>
          : <ButtonText color='#000000' onClick={onOpenModal}
              data-tip={t('left-menu.tooltip.change-language')}
              >
              {t('left-menu.change-language')}
              </ButtonText>
        }

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
