import React from "react";
import { Column, Center, BodySmallBoldText, CaptionText } from "../../../common/styles";
import { Row } from "../style";
import PropTypes from 'prop-types';



const ParticipantHeader = ({participant}) => {
    return (
        <Row width="633px">
            <Center><BodySmallBoldText>{participant.participant_name}</BodySmallBoldText></Center>
            <Column>
                <CaptionText>Registration type</CaptionText>
                <BodySmallBoldText>
                    {participant.registration_type}
                </BodySmallBoldText>
            </Column>
            <Column>
                <CaptionText>Location</CaptionText>
                <BodySmallBoldText>{participant.location}</BodySmallBoldText>
            </Column>
            <Center><BodySmallBoldText>Details</BodySmallBoldText></Center>
        </Row>);

}

ParticipantHeader.propTypes = {
    participant: PropTypes.object
}

export default ParticipantHeader;