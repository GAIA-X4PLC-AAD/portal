import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import {  Column, Row, Style, Card, Circle, H4Text, BodyText, ButtonText, H4LightText, MasterButton, HorizontalLine, OutlineButton, TextInput, Image } from '../../common/styles';
import { Padding } from '../discovery/tabs/style';
import RadioButton from '../../common/radio';
import { useResource } from '@axios-use/react';

import OrganizationDetailsView from './onboarding_provider';

import StepsPane from "./steps_pane";
import VCCustomer from './vc_customer';

import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import DidOnboardingView from './onboarding_did';
import VCProvider from './vc_provider';
import FinishCustomer from './finish_customer';
import FinishProvider from './finish_provider';

export const CUSTOMER = 'user'
export const ORGANIZATION = 'organization'


const RequestVCView = ({ type, confirmationCode }) => {
    const {t} = useTranslation()

    const thanksForConfirmingVC = <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.vs_confirmation')}</H4LightText>
                        <BodyText>{t('onboarding.msg_vs_confirmation')}</BodyText>
                        <Padding vertical='20px' />

                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>

    const requestVCUrl = process.env.REACT_APP_EDGE_API_URI + `/onboarding/register/${type}/vc/request/` + confirmationCode
    const [{ data, error, isLoading, code }] = useResource(() => ({ url: requestVCUrl, method: 'POST', data: {}, }), [])

    useEffect(() => { }, [isLoading, error, data]);

    let isError = error != undefined;
    const isSuccess = !isLoading && error == undefined && !(data === undefined)

    if (isSuccess) {
        return thanksForConfirmingVC
    } else {
        return <>Error Requesting VC</>
    }

}
RequestVCView.propTypes = {
    type: PropTypes.string.isRequired,
    confirmationCode: PropTypes.string.isRequired,
}

const EmailAlreadyConfirmedView = () =>{
    const {t} = useTranslation()
    const navigate = useNavigate();

    return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.already_confirmed')}</H4LightText>
                        <HorizontalLine />
                        <Padding vertical='16px' />
                           <BodyText>{t('onboarding.msg_already_confirmed')}</BodyText>
                           <Padding vertical='32px'>
                            <Row><OutlineButton onClick={() => navigate('/')}>{t('onboarding.go_home_button')}</OutlineButton></Row>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>
}
const EmailConfirmedError = (message)=>{
    const navigate = useNavigate();
    if (!message) return null;
    return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.errorConfirmingEmail')}</H4LightText>
                        <HorizontalLine />
                        <Padding vertical='16px' />
                           <BodyText>{message}</BodyText>
                           <Padding vertical='32px'>
                            <Row><OutlineButton onClick={() => navigate('/')}>{t('onboarding.go_home_button')}</OutlineButton></Row>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>   
}

const EmailConfirmedView = ({ type, confirmationCode }) => {
    const {t} = useTranslation()

    const isEmailConfirmedUrl = process.env.REACT_APP_EDGE_API_URI + `/onboarding/register/${type}/confirm_email/` + confirmationCode
    const [{ data, error, isLoading }] = useResource(() => ({ url: isEmailConfirmedUrl, method: 'POST', data: {}, }), [])

    const [shouldReturnVCView, setShouldReturnVCView] = useState(false);

    const navigate = useNavigate();

    const thanksForConfirmingView = <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.thanks_for_confirming')}</H4LightText>
                        <BodyText>{t('onboarding.msg_thanks_for_confirming')}</BodyText>
                        <Padding vertical='32px'>
                            <Row><OutlineButton onClick={() => navigate('/')}>{t('form.submit')}</OutlineButton></Row>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>

    useEffect(() => { }, [isLoading, error, data]);


    let isError = error != undefined;
    const isSuccess = !isLoading && error == undefined && !(data === undefined)

    if (shouldReturnVCView) return <RequestVCView type={type} confirmationCode={confirmationCode} />

    if (isSuccess) {
        return thanksForConfirmingView
    } else {        
         return EmailConfirmedError(error?.data?.message);
     }
}

EmailConfirmedView.propTypes = {
    type: PropTypes.string.isRequired,
    confirmationCode: PropTypes.string.isRequired,
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

    console.log(`DontHaveDidView, data: ${data}`)

    useEffect(() => { }, [isLoading, error, data]);
    const {t} = useTranslation()


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

    let isError = error != undefined;
    const isSuccess = !isLoading && error == undefined && !(data === undefined)

    // if (isSuccess) return



    return <>
        <Style width='633px'>
            <Padding>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px' vertical='12px'>
                        <H4LightText>{t('form.regViaDIDIdPHeading')}</H4LightText>
                        <BodyText>{t('form.regViaDIDIdPSelect')}</BodyText>
                        <HorizontalLine />
                        {buildIdentifyServiceProvider({ background: '#46DAFF1F' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}
                        {buildIdentifyServiceProvider({ background: '#fff' })}

                        <Padding paddingTop='32px'>
                            <Row><OutlineButton onClick={() => dontHaveDidModal()}>{t('login.close')}</OutlineButton></Row>
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


    const { t } = useTranslation();

    const registerUserUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/'
    const didRegisterUserUrl = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/user/did_register'
    
    const location = useLocation();
    const { userType, confirmationCode } = useParams();

    let initialPage = 1
    if (confirmationCode !== undefined) {
        initialPage = 4
    } else if (location && location.pathname.includes('/proof')) {
        initialPage = 5
    } else if (location && location.pathname.includes('email_already_confirmed')) {
        initialPage = 4;
    }

    const [activeStage, setActiveStage] = useState(initialPage)
    // const [activeStage, setActiveStage] = useState(4)
    const [customerOrOrganization, setCustomerOrOrganization] = useState(userType == ORGANIZATION ? ORGANIZATION : CUSTOMER)

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


    const nextStage = () => {
        // will not use setActiveStage(activeStage + 1), because I might do validation to the existing stage before moving to the next
        if (activeStage == 1) {
            setActiveStage(2)
        } else if (activeStage == 2) {
            if (validateUserFillDetailsForm()) {
                // const _result = await registerUserApi()
                // console.log(`nextStage, _result: ${_result}`)
                // if (_result) setActiveStage(3)
                setActiveStage(3)
            }

        } else if (activeStage == 3) {
            setActiveStage(4)

        } else if (activeStage == 4) {
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


    // CURRENT STAGE VIEW
    const CurrentStageView = () => {
        if (activeStage == 1) {
            return customerOrProviderView()
        } else if (activeStage == 2) {
            if (customerOrOrganization == ORGANIZATION) return <OrganizationDetailsView nextStage={() => { setActiveStage(3) }} didStage={()=> {setActiveStage(5)}}/>;
            else { return userFillDetailsView() }
        } else if (activeStage == 3) {
            return confirmationEmailView()
        } else if (activeStage == 4) {
            if (confirmationCode !== undefined) {
                return EmailConfirmedView({ type: customerOrOrganization, confirmationCode: confirmationCode })
            } else {
                return EmailAlreadyConfirmedView();
            }
        }
        else if (activeStage == 5) {
            return <DidOnboardingView userType={customerOrOrganization} nextStage={()=>{setActiveStage(6)}} />
        } else if( activeStage == 6) {
            if (customerOrOrganization == ORGANIZATION) return <VCProvider nextStage={() => { setActiveStage(7) }}/>;
            else { return  <VCCustomer nextStage={() => { setActiveStage(7) }}/>; }
        } else if (activeStage ===7) {
            if (customerOrOrganization == ORGANIZATION) return <FinishProvider/>;
            else { return  <FinishCustomer />; }
           
        }
        else return null;

        // return <><h1>Stage View</h1></>
    }

    const welcomingMessage = () => {
        return (
            <>
                <Column alignItems='start'>
                    <H4Text>{t('onboarding.welcome_to_gaiax')}</H4Text>
                    <BodyText>{t('onboarding.msg_create_your_account')}</BodyText>
                </Column>
            </>
        )
    }

    const stepsPane = ({ activeStage = 1, isNextDisabled = false, isPreviousDisabled = false }) => {


        const isCustomer = CUSTOMER == customerOrOrganization

        return (
            <>
                <StepsPane type={customerOrOrganization} currentStage={activeStage} />
                <Row>
                    <Padding vertical='32px'>{!isPreviousDisabled && <MasterButton disabled={isPreviousDisabled} onClick={() => previousStage()}>{t('form.prev')}</MasterButton>}</Padding>
                    <Padding vertical='32px'>{!isNextDisabled && <MasterButton ref={nextButtonRef} disabled={isNextDisabled} onClick={() => nextStage()}>{t('form.next')}</MasterButton>}</Padding>
                </Row>
            </>
        )
    }

    const customerOrProviderView = () => {
        return <>
            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                       <H4LightText>{t('onboarding.UserOrganization_header')}</H4LightText>
                        <HorizontalLine/>
                        <Padding horizontal='24px'>
                            <Padding vertical='40px'>
                                <Column>
                                    <RadioButton name='step1' onClick={() => setCustomerOrOrganization(CUSTOMER)} defaultChecked={CUSTOMER == customerOrOrganization}><BodyText>{t('onboarding.customer')}</BodyText></RadioButton>
                                    <RadioButton name='step1' onClick={() => setCustomerOrOrganization(ORGANIZATION)} defaultChecked={ORGANIZATION == customerOrOrganization}><BodyText>{t('onboarding.organization')}</BodyText></RadioButton>
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
                            <H4LightText>{t('onboarding.almost_done')}</H4LightText>
                            <BodyText>{t('onboarding.check_email')}</BodyText>
                            <Padding vertical='10px' />
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
                            <H4LightText>{t('onboarding.customer_details')}</H4LightText>
                            <BodyText>Lorem ipsum dolor si jet .</BodyText>
                            <HorizontalLine />
                            <Padding vertical='12px'>
                                <form ref={userFillDetailsFormRef} noValidate>
                                    <Column>
                                        <TextInput type='text' placeholder={t('form.lFirstName')} name='first_name' value={userFormDetailsInput.first_name || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='4px' />
                                        <TextInput type='text' placeholder={t('form.lLastName')} name='last_name' value={userFormDetailsInput.last_name || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='16px' />
                                        <TextInput type='text' placeholder={t('form.lEmail')} name='email' value={userFormDetailsInput.email || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder={t('form.lPhone')} name='phone' value={userFormDetailsInput.phone || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder={t('form.lCity')} name='city' value={userFormDetailsInput.city || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder={t('form.lCountry')} name='country' value={userFormDetailsInput.country || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder={t('form.lAddress')} name='address' value={userFormDetailsInput.address || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='8px' />
                                        <TextInput type='text' placeholder={t('form.lZIP')} name='zip_code' value={userFormDetailsInput.zip_code || ''} onChange={(e) => onFormChanged(e)} required />
                                        <Padding vertical='28px'>
                                            <Row>
                                                <OutlineButton onClick={e => setActiveStage(5)}>{t('form.registerDid')}</OutlineButton>
                                                <Style flexGrow='1' />
                                                <OutlineButton onClick={() => {
                                                    if (validateUserFillDetailsForm()) {
                                                        // const _result = await registerUserApi()
                                                        // console.log(`nextStage, _result: ${_result}`)
                                                        // if (_result) setActiveStage(3)
                                                        setActiveStage(3)
                                                    }
                                                }}>{t('form.submit')}</OutlineButton>
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
        return true
    }

    const disablePreviousButton = () => {
        if (activeStage === 2) {
            return false
        }
        return true
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
                        <Style width='307px'>{stepsPane({ activeStage: activeStage, isNextDisabled: disableNextButton(), isPreviousDisabled: disablePreviousButton() })}</Style>
                        <CurrentStageView />
                    </Row>
                </Padding>
            </Column>

        </Row>
    </>;

}

OnboardingPage.propTypes = {
    confirmationCode: PropTypes.string,
    type: PropTypes.string
}

export default OnboardingPage;
