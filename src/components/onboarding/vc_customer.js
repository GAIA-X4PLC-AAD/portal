import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Column, BodyText, CaptionTeleNeoText, Card, H4LightText, HorizontalLine, Padding, Style, TextInput, BlueButton } from "../../common/styles";
import LoadingView from "../loading_view/LoadingView";

const VCCustomer = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/vc';

    const showDetails = (vc) => {
        return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>Organization details</H4LightText>
                        <BodyText>Lorem ipsum dolor si jet .</BodyText>
                        <HorizontalLine />
                        <Padding vertical='12px' horizontal='80px'>
                                <Column>
                                    <CaptionTeleNeoText>{t('onboarding.first_name_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.first_name} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.last_name_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.last_name} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.email_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.email} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.phone_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.phone} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.street_number_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.address} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.city_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.city} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.country_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.country} readOnly/>
                                    <Padding vertical='12px' />
                                    <CaptionTeleNeoText>{t('onboarding.zip_placeholder')}</CaptionTeleNeoText>
                                    <Padding vertical='3px' />
                                    <TextInput type='text' value={vc.zip_code} readOnly/>
                                    <Padding vertical='28px'>
                                        <BlueButton onClick={e=>onFormSubmit()} marginLeft="0">{t('onboarding.continue_button')}</BlueButton>
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
                        <H4LightText>Registration status</H4LightText>
                        <HorizontalLine />
                        <Padding vertical='12px'>
                           <BodyText>You have already triggered the compliance check. Your registration is still in process.</BodyText>
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
        console.log(data);
        const vc = data.vc;
        const first_did = data.first_did;

        if (first_did) {
            return showDetails(data.vc);
        } else {
            return showErrorMessage();
        }
      
    }

    return <LoadingView url={URL} successView={vcShow}/>
}

export default VCCustomer;