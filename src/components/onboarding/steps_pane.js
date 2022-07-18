import { useTranslation } from "react-i18next";
import React from "react";
import PropTypes from 'prop-types';
import { BodyBoldText, BodySmallBoldText, BodySmallText, Card, Circle, Column, Padding, Row, Style } from "../../common/styles";

const StepsPane = ({type, currentStage}) => {


    const {t} = useTranslation();

    const buildStepCardView = ({ stage, title, subtitle, isActive }) => {
        return (
            <Padding vertical='12px' paddingTop={stage == 1 ? '0px' : ''}>
                <Card background='#fff' borderColor='#0' boxShadow={`0px ${isActive ? '3' : '2'}px 4px 0px rgb(29 36 48 / ${isActive ? '25' : '12'}%)`}>
                    <Padding vertical='12px' horizontal='10px'>
                        <Row alignItems='center'>
                            <Circle radius='44px' background={isActive ? '#000094' : '#E9E9E9'} borderColor='#0'>
                                <BodySmallBoldText color={isActive ? '#fff' : '#2A2A2A'}>{stage}</BodySmallBoldText>
                            </Circle>
                            <Padding horizontal='20px'>
                                <Column>
                                    <BodyBoldText>{title}</BodyBoldText>
                                    <BodySmallText>{subtitle}</BodySmallText>
                                </Column>
                            </Padding>
                            <Style flexGrow='1'></Style>
                            <Circle radius='8px' background={isActive ? '#6BB324' : '#E9E9E9'} borderColor='#0' />
                        </Row>
                    </Padding>
                </Card>
            </Padding>
        )
    }

    return (
        <>
            {buildStepCardView({ stage: '1', title: t(`onboarding.customerprovider`), subtitle: t('onboarding.step_1'), isActive: (1 === currentStage) })}
            {buildStepCardView({ stage: '2', title: t(`onboarding.${type||'user'}_details`), subtitle: t('onboarding.step_2'), isActive: (2 === currentStage) })}
            {buildStepCardView({ stage: '3', title: t(`onboarding.email_confirmation`), subtitle: t('onboarding.step_3'), isActive: (3 === currentStage)})}
            {buildStepCardView({ stage: '4', title: t(`onboarding.request_submission`), subtitle: t('onboarding.step_4'), isActive: (4 === currentStage) })}
        </>
    )
}

StepsPane.propTypes = {
    type: PropTypes.string,
    currentStage: PropTypes.number
}
export default StepsPane;