import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle, H4Text, BodyText, BodyBoldText, BodySmallText, MasterButton, ButtonText, H4LightText, HorizontalLine, OutlineButton, TextInput, Image } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import RadioButton from "../../common/radio";
import Checkbox from "../../common/checkbox";


const OnboardingPage = () => {

    const welcomingMessage = () => {
        return (
            <>
                <Column alignItems='start'>
                    <H4Text>Welcome to Gaia-X</H4Text>
                    <BodyText>Create your account in a few steps and benefit of our secure and transparent Federated Catalogue.</BodyText>
                </Column>
            </>
        )
    }

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
                            <Circle radius='8px' background='#E9E9E9' borderColor='#0' />
                        </Row>
                    </Padding>
                </Card>
            </Padding>
        )
    }

    const stepsPane = () => {
        return (
            <>
                {buildStepCardView({ stage: '1', title: 'Customer or provider', subtitle: 'Step 1', })}
                {buildStepCardView({ stage: '2', title: 'Organization details', subtitle: 'Step 2', isActive: true })}
                {buildStepCardView({ stage: '3', title: 'Confirmation email', subtitle: 'Step 3' })}
                {buildStepCardView({ stage: '4', title: 'Email notification', subtitle: 'Step 4' })}
                <Padding vertical='32px'><MasterButton>Next</MasterButton></Padding>
            </>
        )
    }

    const customerOrProviderView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Do you want to register as a customer or provider?</H4LightText>
                            <ButtonText color='#00A2E4'>Learn more</ButtonText>
                            <HorizontalLine />
                            <Padding vertical='40px'>
                                <Column>
                                    <RadioButton name='step1'><BodyText>Customer</BodyText></RadioButton>
                                    <RadioButton name='step1'><BodyText>Provider</BodyText></RadioButton>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }


    const organizationDetailsView = () => {
        const [isChecked, setIsChecked] = useState(false);

        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Do you want to register as a customer or provider?</H4LightText>
                            <ButtonText color='#00A2E4'>Learn more</ButtonText>
                            <HorizontalLine />
                            <Padding vertical='24px'>
                                <Column>
                                    <BodyText>Please upload your organization details or select express registration via DID.</BodyText>
                                    <Padding vertical='16px' alignSelf='start'><OutlineButton>Upload</OutlineButton></Padding>
                                    <Padding vertical='16px' />
                                    <TextInput type="text" placeholder="Organization Name" />
                                    <Padding vertical='4px' />
                                    <TextInput type="text" placeholder="Email" />
                                    <Padding vertical='8px' />
                                    {/* Checkbox */}
                                    <Row alignItems='center'>
                                        <label>
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={(event) => { setIsChecked(event.target.checked) }}
                                            />
                                        </label>
                                        <Padding horizontal='4px' />
                                        <BodyText>Apply for AISBL Membership</BodyText>
                                        <Padding horizontal='7px' />
                                        <Image objectFit='contain' src='/images/question-mark.svg' />
                                    </Row>

                                    <Padding vertical='28px'>
                                        <Row>
                                            <OutlineButton>Registration via DID</OutlineButton>
                                            <Padding horizontal='10px' />
                                            <OutlineButton>Send</OutlineButton>
                                        </Row>
                                    </Padding>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    return <>
        <Row>
            <Column>
                {welcomingMessage()}
                <Padding vertical='64px'>
                    <Row>
                        <Style width='307px'>{stepsPane()}</Style>
                        {organizationDetailsView()}
                    </Row>
                </Padding>
            </Column>

        </Row>
    </>;

}

OnboardingPage.propTypes = {
    type: PropTypes.string
}

export default OnboardingPage;