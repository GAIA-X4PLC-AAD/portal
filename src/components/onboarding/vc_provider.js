import React from "react";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import Checkbox from "../../common/checkbox";
import { Column, BodyText, CaptionTeleNeoText, Card, H4LightText, HorizontalLine, Padding, Row, Style, TextInput, Image, BlueButton } from "../../common/styles";
import LoadingView from "../loading_view/LoadingView";

const VCProvider = ({nextStage}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/organization/vc';

    const showOrganizationDetails = (vc) => {
        return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.organization_details')}</H4LightText>
                        <BodyText>{t('onboarding.organization_details_subtext')}</BodyText>
                        <HorizontalLine />
                        <Padding vertical='12px' horizontal='80px'>
                                <Column>
                                    <CaptionTeleNeoText>{t('onboarding.organization_name_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.name} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.email_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.email} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.phone_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.phone_number} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.street_number_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.street_number} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.city_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.city} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.zip_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.zip} readOnly/>
                                    <Padding vertical='12px' />
                                    <Row alignItems='center'>
                                        <label>
                                            <Checkbox name='aisbl'
                                                checked={vc.aisbl||false} readOnly={true}/>
                                        </label>
                                        <Padding horizontal='4px' />
                                        <BodyText>{t('onboarding.organization_aisbl')}</BodyText>
                                        <Padding horizontal='7px' />
                                        <Image objectFit='contain' src='/images/question-mark.svg' />
                                    </Row>
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
    const showErrorMessage = () => {
        return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.vc_error_header')}</H4LightText>
                        <HorizontalLine />
                        <Padding vertical='12px'>
                           <BodyText>{t('onboarding.vc_error_message')}</BodyText>
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

    const vcShow = ({data}) => {

        if (!data) return null;

        const vc = data.vc;
        const first_did = data.first_did;

        if (first_did) {
            return showOrganizationDetails(data.vc);
        } else {
            return showErrorMessage();
        }
      
    }

    return <LoadingView url={URL} successView={vcShow}/>
}
VCProvider.propTypes = {
    nextStage: PropTypes.func.isRequired
}

export default VCProvider;