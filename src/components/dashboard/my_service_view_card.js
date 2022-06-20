import React from "react";
import { useTranslation } from "react-i18next";

import { BodySmallBoldText, ButtonText, CaptionText, Circle, Column, HeaderTitle, Row, Style } from "../../common/styles";
import PropTypes from 'prop-types';

import { Block } from "../expandable/style";
import { Padding } from "../discovery/tabs/style";


const MyServiceViewCard = ({ index, isEditable }) => {

    const { t, i18n } = useTranslation();

    const colItem = ({ title, caption, subtitle, }) => {
        return <Column>
            <Row justifyContent='space-between' alignItems='center'>
                <BodySmallBoldText>{title}</BodySmallBoldText>
                <CaptionText>{caption}</CaptionText>
            </Row>
            <CaptionText>{subtitle}</CaptionText>
        </Column>
    }

    const buildCard = () => {
        return (
            <Style maxWidth='315px'>
                <Padding horizontal={'12px'}>
                    <Block border={true} borderBottom={true}>
                        <Padding vertical='20px' horizontal='20px'>
                            <Column>
                            {isEditable ? <Circle radius='10px' background='#0000' borderColor='#0000'/> : <Circle radius='10px' background='#7fcdbb' borderColor='#0000'/>}
                                
                                <Style minWidth='100%'>
                                    <Padding vertical='18px'>
                                        <Style height='160px' backgroundColor='#fafafa'/>
                                    </Padding>
                                </Style>
                                <Row justifyContent='start' alignItems='center'>
                                    <Circle radius='50px'><CaptionText>LOGO</CaptionText></Circle>
                                    <Padding horizontal='8px'>
                                        {colItem({
                                            title: 'Data Name',
                                            subtitle: 'Provider URL',
                                        })}
                                    </Padding>
                                </Row>
                                <Style maxWidth='213px'>
                                    <Padding vertical='10px'>
                                        <CaptionText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...</CaptionText>
                                    </Padding>
                                </Style>

                                <Padding vertical><ButtonText>{isEditable ? t('dashboard.edit') : t('dashboard.activate')}</ButtonText></Padding>
                            </Column>
                        </Padding>
                    </Block>
                </Padding>
            </Style>
        );
    }

    return buildCard();
}

MyServiceViewCard.propTypes = {
    type: PropTypes.string,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
};


export default MyServiceViewCard;