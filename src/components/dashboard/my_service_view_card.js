import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BodySmallBoldText, ButtonText, CaptionText, Circle, Column, HeaderTitle, Row, Style } from "../../common/styles";
import PropTypes from 'prop-types';

import Plot from 'react-plotly.js';
import { Block } from "../expandable/style";
import { Padding } from "../discovery/tabs/style";
import ImageGallery from 'react-image-gallery';


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
                <Padding horizontal={index == 0 ? '' : '12px'}>
                    <Block border={true} borderBottom={true}>
                        <Padding vertical='20px' horizontal='20px'>
                            <Column>
                                <Style minWidth='100%'>
                                    <Padding vertical='18px'>
                                        <Style height='160px' backgroundColor='#fafafa'/>
                                    </Padding>
                                </Style>
                                <Row justifyContent='start' alignItems='center'>
                                    <Circle width='41px' height='39px'><CaptionText>LOGO</CaptionText></Circle>
                                    <Padding horizontal='8px'>
                                        {colItem({
                                            title: 'Welcome to Gaia-x, Jane Doe',
                                            subtitle: 'Registered as part of <Company GmbH>',
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