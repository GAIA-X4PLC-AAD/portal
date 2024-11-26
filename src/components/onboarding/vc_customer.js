import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { retrieveAndRemoveOnboardingJWT } from '../../common/auth';
import LoadingViewDeprecated from '../../common/components/loadingIndicator/LoadingViewDeprecated';
import {
  BlueButton,
  BodyText,
  CaptionTeleNeoText,
  Card,
  Column,
  H4LightText,
  HorizontalLine,
  Padding,
  Style,
  TextInput
} from '../../common/styles';
import { Row } from '../admin/style';

const VCCustomer = ({ nextStage }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/vc';

  const showDetails = (vc) => {
    return <>
      <Style width='633px' height='246px'>
        <Padding horizontal='20px'>
          <Card background='#fff' borderColor='#0' boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}>
            <Padding horizontal='24px'>
              <H4LightText>{t('onboarding.customer_details')}</H4LightText>
              <BodyText>{t('onboarding.customer_details_subtext')}</BodyText>
              <HorizontalLine />
              <Padding vertical='12px' horizontal='80px'>
                <Column>
                  <Row width='100%'>
                    <Column margin='0 auto 0 0'>
                      <CaptionTeleNeoText>{t('onboarding.first_name_placeholder')}</CaptionTeleNeoText>
                      <Padding vertical='3px' />
                      <TextInput type='text' value={vc.first_name} readOnly/>
                    </Column>
                    <Column margin='0 0 0 auto'>
                      <CaptionTeleNeoText>{t('onboarding.last_name_placeholder')}</CaptionTeleNeoText>
                      <Padding vertical='3px' />
                      <TextInput type='text' value={vc.last_name} readOnly/>
                    </Column>

                  </Row>
                  <Padding vertical='12px' />
                  <CaptionTeleNeoText>{t('onboarding.email_placeholder')}</CaptionTeleNeoText>
                  <Padding vertical='3px' />
                  <TextInput type='text' value={vc.email} readOnly/>
                  <Padding vertical='12px' />
                  <CaptionTeleNeoText>{t('onboarding.phone_placeholder')}</CaptionTeleNeoText>
                  <Padding vertical='3px' />
                  <TextInput type='text' value={vc.phone} readOnly/>
                  <Padding vertical='12px' />
                  <Row width="100%">
                    <Column margin='0 auto 0 0'>
                      <CaptionTeleNeoText>{t('onboarding.city_placeholder')}</CaptionTeleNeoText>
                      <Padding vertical='3px' />
                      <TextInput type='text' value={vc.city} readOnly/>
                    </Column>
                    <Column margin='0 0 0 auto'>
                      <CaptionTeleNeoText>{t('onboarding.country_placeholder')}</CaptionTeleNeoText>
                      <Padding vertical='3px' />
                      <TextInput type='text' value={vc.country} readOnly/>
                    </Column>
                  </Row>
                  <Padding vertical='12px' />
                  <CaptionTeleNeoText>{t('onboarding.street_number_placeholder')}</CaptionTeleNeoText>
                  <Padding vertical='3px' />
                  <TextInput type='text' value={vc.address} readOnly/>
                  <Padding vertical='12px' />
                  <CaptionTeleNeoText>{t('onboarding.zip_placeholder')}</CaptionTeleNeoText>
                  <Padding vertical='3px' />
                  <TextInput type='text' value={vc.zip_code} readOnly/>
                  <Padding vertical='28px'>
                    <BlueButton onClick={e=>nextStage()} marginLeft="0">{t('onboarding.continue_button')}</BlueButton>
                  </Padding>
                </Column>
              </Padding>
            </Padding>
          </Card>
        </Padding>
      </Style>
    </>
  }
  const showErrorMessage = (headerText, bodyText) => {
    return <>
      <Style width='633px' height='246px'>
        <Padding horizontal='20px'>
          <Card background='#fff' borderColor='#0' boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}>
            <Padding horizontal='24px'>
              <H4LightText>{headerText}</H4LightText>
              <HorizontalLine />
              <Padding vertical='12px'>
                <BodyText>{bodyText}</BodyText>
              </Padding>
              <Padding vertical='28px'>
                <BlueButton onClick={e=>navigate('/')} marginLeft="0">{t('onboarding.home_button')}</BlueButton>
              </Padding>
            </Padding>
          </Card>
        </Padding>
      </Style>
    </>
  };

  const vcShow = ({ data }) => {
    if (!data) {return null;}

    const first_did = data.first_did;
    if (first_did) {
      return showDetails(data.vc);
    } else {
      return showErrorMessage(t('onboarding.vc_error_header'), t('onboarding.vc_error_message'));
    }
  }

  const headerAuth = {
    Authorization: 'Bearer ' + retrieveAndRemoveOnboardingJWT()
  }

  return <LoadingViewDeprecated url={URL} successView={vcShow} headers={headerAuth}/>
}

VCCustomer.propTypes = {
  nextStage: PropTypes.func.isRequired
}

export default VCCustomer;
