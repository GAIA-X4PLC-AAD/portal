import React from "react";
import { Column, Center, BodySmallBoldText, CaptionText, Style } from "../../../common/styles";
import { Row } from "../style";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";



const ParticipantHeader = ({participant}) => {

    const {t} = useTranslation();


    return (
        <Row width="633px">
            <Style maxWidth="120px" minWidth="120px">
                <BodySmallBoldText>{participant.participant_name}</BodySmallBoldText>
            </Style>
            <Column width="155px">
                <CaptionText>{t('admin.registration_type')}</CaptionText>
                <BodySmallBoldText>
                    {t(`admin.${participant.registration_type}`)}
                </BodySmallBoldText>
            </Column>
            <Column>
                <CaptionText>{t('admin.location')}</CaptionText>
                <BodySmallBoldText>{participant.location}</BodySmallBoldText>
            </Column>
            <Center><BodySmallBoldText>{t('admin.details')}</BodySmallBoldText></Center>
        </Row>);

}

ParticipantHeader.propTypes = {
    participant: PropTypes.object
}

export default ParticipantHeader;