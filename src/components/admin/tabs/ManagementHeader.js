import React from "react";
import { Column, Center, BodySmallBoldText, CaptionText, Style } from "../../../common/styles";
import { Row } from "../style";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";



const ManagementHeader = ({participant}) => {
    const {t} = useTranslation();
    return (
        <Row width="100%">
            <Style maxWidth="120px" minWidth="120px">
                <BodySmallBoldText>{participant.participant_name}</BodySmallBoldText>
            </Style>
            <Column width="155px">
                <CaptionText>{t('admin.request_type')}</CaptionText>
                <BodySmallBoldText>
                    {t(`admin.${participant.request_type}`)}
                </BodySmallBoldText>
            </Column>
            <Column width="100px">
                <CaptionText>{t('admin.location')}</CaptionText>
                <BodySmallBoldText>{participant.location}</BodySmallBoldText>
            </Column>
            <Center><BodySmallBoldText>{t('admin.details')}</BodySmallBoldText></Center>
        </Row>);

}

ManagementHeader.propTypes = {
    participant: PropTypes.object
}

export default ManagementHeader;