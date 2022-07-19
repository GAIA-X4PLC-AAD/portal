import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle, H4Text, BodyText, BodyBoldText, BodySmallText, MasterButton, ButtonText, H4LightText, HorizontalLine, OutlineButton, TextInput, Image, StyledModal, FadingBackground, H1Text } from '../../common/styles';
import { Padding } from '../discovery/tabs/style';
import RadioButton from '../../common/radio';
import Checkbox from '../../common/checkbox';
import { useResource } from '@axios-use/react';

import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

import OrganizationDetailsView from './onboarding_provider';

import StepsPane from './steps_pane';

export const CUSTOMER = 'customer'
export const ORGANIZATION = 'organization'


const RegistartinViaDidView = ({ toggleRegistrationViaDidModal }) => {

    const onboardingIdpUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/idp'
    const [{ data, error, isLoading }] = useResource(() => ({ url: onboardingIdpUrl }), [])

    useEffect(() => { }, [isLoading, error, data]);


    const buildIdentifyServiceProvider = ({ background = '#fff' }) => {
        return (
            <Padding vertical='8px'>
                <Card background={background} borderColor='#E9E9E9'>
                    <Padding vertical='4px' horizontal='16px'>
                        <Row>
                            <Circle radius='56px' borderColor='#0' background='#C4C4C4'>LOGO</Circle>
                            <Padding paddingLeft='16px' />
                            <ButtonText color='#000000'>Identify Service Provider 1</ButtonText>
                            <Style flexGrow='1' />
                            <ButtonText color='#00A2E4'>Link</ButtonText>
                        </Row>
                    </Padding>
                </Card>
            </Padding>
        )
    }

    return <>
        <Style width='633px'>
            <Padding>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px' vertical='12px'>
                        <H4LightText>Don’t have a DID?</H4LightText>
                        <BodyText>Please select a idSP to create DID</BodyText>
                        <HorizontalLine />
                        {buildIdentifyServiceProvider({ background: '#46DAFF1F' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}

                        <Padding paddingTop='32px'>
                            <Row><OutlineButton onClick={() => toggleRegistrationViaDidModal()}>Close</OutlineButton></Row>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>

}

RegistartinViaDidView.propTypes = {
    toggleRegistrationViaDidModal: PropTypes.func.isRequired,
}



const QrLoadingView = () => {
    const didRegisterUserUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/did_register'
    const [{ data, error, isLoading }] = useResource(() => ({ url: didRegisterUserUrl }), [])

    useEffect(() => { }, [isLoading, error, data]);


    let isError = error != undefined;

    if (!isLoading && error == undefined && !(data === undefined)) {
        return <Image src='/images/QRCode.png' width='200px' />
    } else {
        return <BodyText>Loading...</BodyText>
    }

}


const DontHaveDidView = ({ dontHaveDidModal }) => {

    const onboardingIdpUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/idp'
    const [{ data, error, isLoading }] = useResource(() => ({ url: onboardingIdpUrl }), [])

    useEffect(() => { }, [isLoading, error, data]);


    const buildIdentifyServiceProvider = ({ background = '#fff' }) => {
        return (
            <Padding vertical='8px'>
                <Card background={background} borderColor='#E9E9E9'>
                    <Padding vertical='4px' horizontal='16px'>
                        <Row>
                            <Circle radius='56px' borderColor='#0' background='#C4C4C4'>LOGO</Circle>
                            <Padding paddingLeft='16px' />
                            <ButtonText color='#000000'>Identify Service Provider 1</ButtonText>
                            <Style flexGrow='1' />
                            <ButtonText color='#00A2E4'>Link</ButtonText>
                        </Row>
                    </Padding>
                </Card>
            </Padding>
        )
    }

    return <>
        <Style width='633px'>
            <Padding>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px' vertical='12px'>
                        <H4LightText>Don’t have a DID?</H4LightText>
                        <BodyText>Please select a idSP to create DID</BodyText>
                        <HorizontalLine />
                        {buildIdentifyServiceProvider({ background: '#46DAFF1F' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}

                        <Padding paddingTop='32px'>
                            <Row><OutlineButton onClick={() => dontHaveDidModal()}>Close</OutlineButton></Row>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>

}

DontHaveDidView.propTypes = {
    dontHaveDidModal: PropTypes.func.isRequired,
}

const OnboardingPage = () => {

    const registerUserUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/'
    const didRegisterUserUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/did_register'


    const [activeStage, setActiveStage] = useState(1)
    const [customerOrOrganization, setCustomerOrOrganization] = useState(null)

    const userFillDetailsFormRef = React.createRef()
    const nextButtonRef = React.createRef()

    const [userFormDetailsInput, setInput] = useState({});

    // DONT HAVE DID MODAL
    const [dontHaveDidModalIsOpen, setDontHaveDidModalIsOpen] = useState(false);
    const [dontHaveDidModalOpacity, setDontHaveModalOpacity] = useState(0);

    function dontHaveDidModal(e) {
        setDontHaveModalOpacity(0);
        setDontHaveDidModalIsOpen(!dontHaveDidModalIsOpen);
    }


    // REGISTRATION VIA DID
    const [registrationViaDidModalIsOpen, setRegistrationViaDidModalIsOpen] = useState(false);
    const [registrationViaDidModalOpacity, setRegistrationViaDidModalOpacity] = useState(0);

    function registrationViaDidModal(e) {
        setRegistrationViaDidModalOpacity(0);
        registrationViaDidModalOpacity(!registrationViaDidModalIsOpen);
    }

    const registerUserApi = async () => {

        try {
            const _result = await axios.post(registerUserUrl, userFormDetailsInput, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            if (_result.response) return true
        } catch (err) {
            console.log(`registerUserApi, err: ${err}`)
            if (err) alert(err.message)

        }

        return false
    }

    const didRegisteredUserApi = async () => {

        try {
            const _result = await axios.get(didRegisterUserUrl, {})
            if (_result.response) return _result.response
        } catch (err) {
            if (err) alert(err.message)

        }

        return null
    }

    const nextStage = async () => {
        // will not use setActiveStage(activeStage + 1), because I might do validation to the existing stage before moving to the next
        if (activeStage == 1) {
            setActiveStage(2)
        } else if (activeStage == 2) {
            if (validateUserFillDetailsForm()) {
                const _result = await registerUserApi()
                console.log(`nextStage, _result: ${_result}`)
                // if (_result) setActiveStage(3)
                setActiveStage(3)
            }

        } else if (activeStage == 3 || activeStage == 4) {
            setActiveStage(5)
        } else if (activeStage == 5) {
            dontHaveDidModal()
        }
    }

    const previousStage = () => {
        // will not use setActiveStage(activeStage + 1), because I might do validation to the existing stage before moving to the next
        if (activeStage == 2) {
            setActiveStage(1)
        } else if (activeStage == 3) {
            setActiveStage(2)
        } else if (activeStage == 4) {
            setActiveStage(3)
        } else if (activeStage == 5) {
            setActiveStage(4)
        }
    }

    const currentStageView = () => {

        if (activeStage == 1) {
            return customerOrProviderView()
        } else if (activeStage == 2) {
            if (customerOrOrganization == ORGANIZATION) return <OrganizationDetailsView onSuccess={() => { setActiveStage(3) }} />;
            else { return userFillDetailsView() }
        } else if (activeStage == 3) {
            return confirmationEmailView()
        } else if (activeStage == 4 || activeStage == 5) {
            return verifyQrView()
        } else return verifyQrView()
    }

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

    const stepsPane = ({ activeStage = 1, isNextDisabled = false }) => {


        const isCustomer = CUSTOMER == customerOrOrganization
        const nextStr = isCustomer && activeStage == 2 ? 'Send' : 'Next'

        return (
            <>
                <StepsPane type={customerOrOrganization} currentStage={activeStage} />
                <Row>
                    <Padding vertical='32px'><MasterButton disabled={activeStage === 1} onClick={() => previousStage()}>Previous</MasterButton></Padding>

                    <Padding vertical='32px'><MasterButton ref={nextButtonRef} disabled={isNextDisabled} onClick={() => nextStage()}>{nextStr}</MasterButton></Padding>
                </Row>
            </>
        )
    }

    const customerOrProviderView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <Padding vertical='40px'>
                                <Column>
                                    <RadioButton name='step1' onClick={() => setCustomerOrOrganization(CUSTOMER)} defaultChecked={CUSTOMER == customerOrOrganization}><BodyText>Customer</BodyText></RadioButton>
                                    <RadioButton name='step1' onClick={() => setCustomerOrOrganization(ORGANIZATION)} defaultChecked={ORGANIZATION == customerOrOrganization}><BodyText>Provider</BodyText></RadioButton>
                                </Column>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }


    const confirmationEmailView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Almost done</H4LightText>
                            <BodyText>Please upload your organization details or select express registration via DID.</BodyText>
                            <ButtonText color='#00A2E4'>Resend confirmation link</ButtonText>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const organizationFillDetailsView = () => {

        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Organization details</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet .</BodyText>
                            <HorizontalLine />
                            <Padding vertical='12px'>
                                <Column>
                                    <TextInput type='text' placeholder='Organization Name' />
                                    <Padding vertical='4px' />
                                    <TextInput type='text' placeholder='Email' />
                                    <Padding vertical='8px' />
                                    <TextInput type='text' placeholder='Phone' />
                                    <Padding vertical='8px' />
                                    <TextInput type='text' placeholder='City' />
                                    <Padding vertical='8px' />
                                    <TextInput type='text' placeholder='Address' />
                                    <Padding vertical='8px' />
                                    <TextInput type='text' placeholder='Zip Code' />
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


    const verifyQrView = () => {
        return <>
            <ModalProvider backgroundComponent={FadingBackground}>
                <Style width='633px' height='246px'>
                    <Padding horizontal='20px'>
                        <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                            <Padding horizontal='24px'>
                                <H4LightText>Please verify yourselft as employee of your organization.</H4LightText>
                                <HorizontalLine />
                                <Column justifyContent='center' alignItems='center'>
                                    <Padding vertical='8px'>
                                        <QrLoadingView />
                                    </Padding>
                                    <Padding vertical='20px'>
                                        <Row alignItems='space-between'>
                                            <OutlineButton disabled onClick={() => dontHaveDidModal()}>I don&#39;t have a DID</OutlineButton>
                                            <Padding horizontal='8px' />
                                            <ProofOfOnboardingButton />
                                        </Row>
                                    </Padding>
                                    <Padding vertical='20px'></Padding>
                                </Column>
                            </Padding>
                        </Card>
                    </Padding>
                </Style>
            </ModalProvider>
        </>
    }

    function ProofOfOnboardingButton() {
        function afterOpen() {
            setTimeout(() => {
                setDontHaveModalOpacity(1);
            }, 100);
        }

        function beforeClose() {
            return new Promise((resolve) => {
                setDontHaveModalOpacity(0);
                setTimeout(resolve, 300);
            });
        }

        return (
            <div>
                <StyledModal
                    isOpen={dontHaveDidModalIsOpen}
                    afterOpen={afterOpen}
                    beforeClose={beforeClose}
                    onBackgroundClick={dontHaveDidModal}
                    onEscapeKeydown={dontHaveDidModal}
                    opacity={dontHaveDidModalOpacity}
                    backgroundProps={{ opacity: dontHaveDidModalOpacity }}
                >
                    <DontHaveDidView dontHaveDidModal={dontHaveDidModal} />
                </StyledModal>
            </div>
        );
    }





    const credentialsMissingView = () => {
        return <>
            <Style width='633px'>
                <Padding>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px' vertical='12px'>
                            <H4LightText>Credentials are missing</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet.</BodyText>
                            <HorizontalLine />
                            <BodyText>We couldn&#39;t find any authorized credentials. Please contact your organization.</BodyText>
                            <Padding vertical='20px'><Row><OutlineButton>Continue</OutlineButton></Row></Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }

    const validateUserFillDetailsForm = () => {
        return userFillDetailsFormRef.current.reportValidity()
    }


    const userFillDetailsView = () => {


        const getValue = (target) => {
            switch (target.type) {
                case 'checkbox': return target.checked;
                case 'file': return target.files[0];
                default: return target.value;
            }
        }

        const onFormChanged = (e) => {
            const key = e.target.name;
            const value = getValue(e.target);
            setInput(values => ({ ...values, [key]: value }))
        }


        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Organization details</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet .</BodyText>
                            <HorizontalLine />
                            <Padding vertical='12px'>
                                <form ref={userFillDetailsFormRef} noValidate>
                                    <Column>
                                        <TextInput type='text' placeholder='First Name' name='first_name' value={userFormDetailsInput.first_name || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='4px' />
                                        <TextInput type='text' placeholder='Last Name' name='last_name' value={userFormDetailsInput.last_name || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='16px' />
                                        <TextInput type='text' placeholder='Email' name='email' value={userFormDetailsInput.email || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder='Phone' name='phone' value={userFormDetailsInput.phone || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder='City' name='city' value={userFormDetailsInput.city || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder='Country' name='country' value={userFormDetailsInput.country || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder='Address' name='address' value={userFormDetailsInput.address || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder='Zip Code' name='zip_code' value={userFormDetailsInput.zip_code || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='28px'>
                                            <Row>
                                                <OutlineButton onClick={e => validateUserFillDetailsForm()}>Registration via DID</OutlineButton>
                                            </Row>
                                        </Padding>
                                    </Column>
                                </form>

                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }


    const disableNextButton = () => {
        if (activeStage == 1) {
            return customerOrOrganization == null
        }
        // else if () {

        // }

        return false
    }

    const complienceCheckMessageView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>Complience Check</H4LightText>
                            <BodyText color='#818C99'>Your onboarding request will be checked by the AISBL. This may take  some time. Please enter your email address to recieve status updates of your onboarding. </BodyText>
                            <HorizontalLine />
                            <Padding vertical='8px' />
                            <TextInput type='text' placeholder='Email' />
                            <Padding vertical='32px' />
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
                        <Style width='307px'>{stepsPane({ activeStage: activeStage, isNextDisabled: disableNextButton() })}</Style>
                        {currentStageView()}
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