import React, { useState} from "react";
import PropTypes from 'prop-types';

import {  Column, Row, Style, Card, H4LightText, HorizontalLine, OutlineButton, Image, StyledModal, Circle, ButtonText, BodyText,FadingBackground, CancelButton, BlueButton } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import LoadingView from "../loading_view/LoadingView";

const DidOnboardingView = () => {

    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/idp';

function FancyModalButton() {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenModal = () => setIsOpen(true);
    const onCloseModal = () => setIsOpen(false);

    function toggleModal(e) {
        setIsOpen(!isOpen);
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
                                <ButtonText color='#00A2E4' onClick={()=>{window.open(idp.link, '_blank').focus()}}>Link</ButtonText>
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
                            <H4LightText>Don’t have a DID?</H4LightText>
                            <BodyText>Please select a idSP to create DID</BodyText>
                            <HorizontalLine />
                            {data.map((idp, i) => {return <BuildIdentifyServiceProvider idp={idp} key={i}/>})}
                            <Padding paddingTop='32px'>
                                <Row><OutlineButton onClick={toggleModal}>Close</OutlineButton></Row>
                            </Padding>
                        </Padding>
                    </Card>
                </Padding>
            </Style>
        </>
    }
    
    dontHaveDidView.propTypes = {
        data: PropTypes.object
    }

    return (
        <div>
            <CancelButton onClick={toggleModal}>I don&#39;t have a DID</CancelButton>
            <Modal
                open={isOpen}
                onClose={onCloseModal}
                showCloseIcon={false}
            >
            <LoadingView 
                    url={URL}
                successView={dontHaveDidView}/>
            </Modal>
        </div>
    );

    }

const verifyQrView = () => {
    return <>
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
                                        <FancyModalButton />
                                        <Padding horizontal='8px' />
                                        <BlueButton>Continue</BlueButton>
                                    </Row>
                                </Padding>
                                <Padding vertical='20px'></Padding>
                            </Column>
                        </Padding>
                    </Card>
                </Padding>
            </Style>

    </>
}

    return verifyQrView();
}

export default DidOnboardingView;