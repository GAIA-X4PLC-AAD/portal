import React from "react";
import { useTranslation } from "react-i18next";

import { BodySmallBoldText, ButtonText, CaptionText, Circle, Column, HeaderTitle, Image, Row, Style } from "../../common/styles";
import PropTypes from 'prop-types';

import { Block } from "../expandable/style";
import { Padding } from "../discovery/tabs/style";


const MyServiceViewCard = ({ index, data }) => {

    const isActivated = data['is_activated']
    const isOwn = data['is_own']

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
                <Padding paddingRight='12px'>
                    <Block border={true} borderBottom={true}>
                        <Padding vertical='20px' horizontal='20px'>
                            <Column>
                                {isOwn ? <Circle radius='10px' background='#0000' borderColor='#0000' /> : 
                                    (<>{isActivated ? <Circle radius='10px' background='#7fcdbb' borderColor='#0000' /> 
                                        : <Circle radius='10px' background='#ef6548' borderColor='#0000' />}</>)}

                                <Style minWidth='100%'>
                                    <Padding vertical='18px'>
                                        {/* <Style height='160px' backgroundColor='#fafafa'/> */}
                                        <Image src={data['preview_img']} alt="Logo" width='240px' height='200px' />
                                    </Padding>
                                </Style>
                                <Row justifyContent='start' alignItems='center'>
                                    <Image src={data['logo']} alt="Logo" width='50px' height='50px' />
                                    <Padding horizontal='8px'>
                                        {colItem({
                                            title: data['name'],
                                            subtitle: 'provider_url',
                                        })}
                                    </Padding>
                                </Row>
                                <Style maxWidth='213px'>
                                    <Padding vertical='10px'>
                                        <CaptionText>{data['description']}</CaptionText>
                                    </Padding>
                                </Style>

                                <Padding vertical>{isOwn ? <ButtonText>{t('dashboard.edit')}</ButtonText> : <></>}</Padding>
                                <Padding vertical>{!isOwn ? <ButtonText>{isActivated ? t('dashboard.deactivate') : t('dashboard.activate')}</ButtonText> : <></>}</Padding>

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
    data: PropTypes.object,
};


export default MyServiceViewCard;