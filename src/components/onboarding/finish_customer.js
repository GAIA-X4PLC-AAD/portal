import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BodyText, Card, H4LightText, HorizontalLine, Padding, Style } from "../../common/styles";
import { BlueButton } from "../admin/style";

const FinishCustomer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
}

export default FinishCustomer;