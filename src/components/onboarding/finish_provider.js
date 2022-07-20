import axios from "axios";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BodyText, Card, H4LightText, HorizontalLine, Padding, Style, TextInput } from "../../common/styles";
import { BlueButton } from "../admin/style";
const FinishProvider = () => {

    const {t} = useTranslation();
    const formRef = useRef();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    
    const URL = process.env.REACT_APP_EDGE_API_URI + `/onboarding/register/organization/pr?email=${email}`;
    
    const onFormSubmit = () => {
        if (formRef.current.reportValidity()) {
            console.log(email);
            axios.post(URL).then ( () => {
                navigate('/');
            }, error => {
                setErrorMessage(error.response.data);
            }).catch(error => {
                setErrorMessage('Error with the server, please try again later');
            });
        }
    }

    return <>
    <Style width='633px' height='246px'>
        <Padding horizontal='20px'>
            <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                <Padding horizontal='24px'>
                    <H4LightText>Onboarding completed</H4LightText>
                    <HorizontalLine />
                    <Padding vertical='12px'>
                       <BodyText>Your onboarding request will be checked by the AISBL. This may take some time. Plase enter your email address to receive status updates of your onboarding.</BodyText>
                       <Padding vertical='12px'/>
                       <form ref={formRef}>
                            <TextInput name='email' type="email" value={email||''} placeholder={t('onboarding.email_placeholder')}  onChange={(e)=>setEmail(e.target.value)} required/>
                       </form>
                    </Padding>

                    <Padding vertical='28px'>
                        <BlueButton onClick={onFormSubmit} marginLeft="0">{t('onboarding.finish_button')}</BlueButton>
                    </Padding>
                </Padding>
            </Card>
        </Padding>
    </Style>
</>
}

export default FinishProvider;