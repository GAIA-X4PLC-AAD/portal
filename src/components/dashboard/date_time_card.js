import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BodySmallBoldText, ButtonText, CaptionText, Card, Column, H4Text, HeaderTitle, Image, Row, Style } from "../../common/styles.js";
import PropTypes from 'prop-types';
import moment from 'moment';
// import 'moment/locale/en-ca'
// import 'moment/locale/es'
import "react-multi-carousel/lib/styles.css";
import { Padding } from "../discovery/tabs/style.js";



const DateTimeCard = () => {

    const colItemView = ({ title, caption, subtitle, }) => {
        return <Column>
            <Row $justifyContent='space-between' $alignItems='center'>
                <BodySmallBoldText>{title}</BodySmallBoldText>
                <CaptionText>{caption}</CaptionText>
            </Row>
            <CaptionText>{subtitle}</CaptionText>
        </Column>
    }

    const { t, i18n } = useTranslation();

    const _lang = i18n['language']


    const _isEs = _lang.indexOf('es') == 0
    const _isDe = _lang.indexOf('de') == 0
    if (_isEs) {
        require('moment/locale/es');
        moment.locale('es');
    } else if (_isDe) {
        require('moment/locale/de');
        moment.locale('de');
    } else {
        moment.locale('en');
    }

    const _hour = moment().format('ha')
    const _date = moment().format('dddd, Do MMMM YYYY')

    return <Padding $vertical='24px'>
        <Card>
            <Padding $vertical='16px' $horizontal='24px'>
                {colItemView({ title: _hour, subtitle: _date, caption: '' })}
            </Padding>
        </Card>
    </Padding>

}

DateTimeCard.propTypes = {
    type: PropTypes.string,
};

export default DateTimeCard;