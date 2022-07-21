import React, { useState} from "react";
import PropTypes from 'prop-types';

import {  Column, Row, Style, Card, H4LightText, HorizontalLine, OutlineButton, Image, StyledModal, Circle, ButtonText, BodyText,FadingBackground, CancelButton, BlueButton, H4Text } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import { ModalProvider } from "styled-react-modal";
import LoadingView from "../loading_view/LoadingView";
import AuthPolling from "../login/AuthPolling";
import Modal from "../../Modal";
import { useTranslation } from "react-i18next";

const DidOnboardingView = ({userType, nextStage}) => {

    const {t} = useTranslation();
    const [continue_button, setContinueButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/qr';
    const appMode = process.env.REACT_APP_MODE
    const isSecurityDisabled = appMode == 'SECURITY_DISABLED'


     const onAuthZSuccess = () => {
       console.log('onAuthZSuccess');
       setContinueButton(true);
      }
    
      const onAuthZFailed = () => {
        console.log('onAuthZFailed');
        setErrorMessage(t(`onboarding.authorization_fail_message_${userType}`));
      }
    
      const onAuthZWait= () =>{
        console.log('onAuthZWait');
      }

      const AuthFail = () => {
    
        if (!errorMessage || errorMessage==='') return null;  
        return (
          <Modal>
            <Padding vertical='16px'>    
            <Column>
                <Padding horizontal='24px'>
              <H4LightText>{t("onboarding.authorization_fail_header")}</H4LightText>
              <Padding vertical='36px'/>
                <BodyText> 
                    {errorMessage}       
                </BodyText>
                <Padding vertical='16px'/>
                    <BlueButton onClick={()=> setErrorMessage('')}>
                    {t('login.close')}
                    </BlueButton>
                </Padding>
            </Column>
            </Padding>
          </Modal>
        );
      }
function FancyModalButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/idp';


    function toggleModal(e) {
        setOpacity(0);
        setIsOpen(!isOpen);
    }

    function afterOpen() {
        setTimeout(() => {
            setOpacity(1);
        }, 100);
    }

    function beforeClose() {
        return new Promise((resolve) => {
            setOpacity(0);
            setTimeout(resolve, 300);
        });
    }

    const dontHaveDidView = ({data}) => {
        const BuildIdentifyServiceProvider = ({ idp }) => {
            return (
                <Padding vertical='8px'>
                    <Card background='#fff' hoverBackground='#46DAFF1F'  borderColor='#E9E9E9'>
                        <Padding vertical='4px' horizontal='16px'>
                            <Row>
                                <Circle radius='56px' borderColor='#0' background='#C4C4C4'>
                                    <Image src={idp.logoUrl} alt={idp.name} width='56px' height='56px'/></Circle>
                                <Padding paddingLeft='16px' />
                                <ButtonText color='#000000'>{idp.name}</ButtonText>
                                <Style flexGrow='1' />
                                <ButtonText color='#00A2E4' onClick={()=>{window.open(idp.link, '_blank').focus()}}>{t('onboarding.not_did_modal_link')}</ButtonText>
                            </Row>
                        </Padding>
                    </Card>
                </Padding>
            )
        }
        BuildIdentifyServiceProvider.propTypes= {
            idp: PropTypes.object.isRequired
        }

    
        if (!data) return null;
        else 
        return <>
            <Style width='633px'>
                <Padding>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px' vertical='12px'>
                            <H4LightText>{t('onboarding.not_did_modal_header')}</H4LightText>
                            <BodyText>{t('onboarding.not_did_modal_body')}</BodyText>
                            <HorizontalLine />
                            {data.map((idp, i) => {return <BuildIdentifyServiceProvider idp={idp} key={i}/>})}
                            <Padding paddingTop='32px'>
                                <Row><OutlineButton onClick={toggleModal}>{t('onboarding.close')}</OutlineButton></Row>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }
    
    dontHaveDidView.propTypes = {
        data: PropTypes.object,
        nextStep: PropTypes.func
    }

    return (
        <div>
            <CancelButton onClick={toggleModal}>{t('onboarding.not_did_button')}</CancelButton>
            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >
            <LoadingView 
                    url={URL}
                successView={dontHaveDidView}/>
            </StyledModal>
        </div>
    );

    }

const verifyQrView = ({data}) => {
    if (!data) return null;

    return <>
        <ModalProvider backgroundComponent={FadingBackground}>
        {
          isSecurityDisabled ? '' : <AuthPolling
            onAuthZFailed={onAuthZFailed}
            onAuthZSuccess={onAuthZSuccess}
            onAuthZWait={onAuthZWait}
            statusURL={data.pollUrl}
            continuePollingOnFailure={true}
          />
        }
        {AuthFail()}

            <Style width='633px' height='246px'>
                <Padding horizontal='20px'>
                    <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                        <Padding horizontal='24px'>
                            <H4LightText>{t(`onboarding.proof_onboarding_header_${userType}`)}</H4LightText>
                            <HorizontalLine />
                            <Column justifyContent='center' alignItems='center'>
                                <Padding vertical='8px'>
                                    <Image src={data.qrCodePath} width='200px' />
                                </Padding>
                                <Padding vertical='20px'>
                                    <Row alignItems='space-between'>
                                        <FancyModalButton />
                                        <Padding horizontal='8px' />
                                        <BlueButton disabled ={!continue_button} onClick={nextStage}>{t('onboarding.continue_button')}</BlueButton>
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

    return <LoadingView url={URL} successView={verifyQrView}/>
}
DidOnboardingView.propTypes = {
    userType: PropTypes.string,
    nextStage: PropTypes.func,
}

export default DidOnboardingView;