import React, { useState} from "react";

import {  Column, Row, Style, Card, H4LightText, HorizontalLine, OutlineButton, Image, StyledModal, Circle, ButtonText, BodyText,FadingBackground } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import { ModalProvider } from "styled-react-modal";

const DidOnboardingView = () => {

function FancyModalButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

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

    return (
        <div>
            <OutlineButton onClick={toggleModal}>Continue</OutlineButton>
            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}
                opacity={opacity}
                backgroundProps={{ opacity }}
            >
                {dontHaveDidView()}
            </StyledModal>
        </div>
    );
}

const dontHaveDidView = () => {
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
                            <Row><OutlineButton>Close</OutlineButton></Row>
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
                                    <Image src='/images/QRCode.png' width='200px' />
                                </Padding>
                                <Padding vertical='20px'>
                                    <Row alignItems='space-between'>
                                        <OutlineButton disabled>I don&#39;t have a DID</OutlineButton>
                                        <Padding horizontal='8px' />
                                        <FancyModalButton />
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

    return verifyQrView();
}

export default DidOnboardingView;