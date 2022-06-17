import { RadioButton } from "./style";
import React from "react";
import { BodyText, Column, Row } from "../../common/styles";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ParticipantManagementSelector = ({type}) => {
    const navigate = useNavigate();

    return (<Column>
                <Row>
                    <RadioButton 
                        type="radio"
                        name="radio"
                        value="neverAutoAccept" 
                        onClick={()=>navigate('/admin/participant')}
                        checked={type==='participant'}
                        /> <BodyText>Participant</BodyText>
                </Row>
                <Row>
                    <RadioButton  
                        type="radio"
                        name="radio"
                        value="neverAutoAccept"
                        onClick={()=>navigate('/admin/management')}
                        checked={type==='management'}/><BodyText>Management</BodyText>
                </Row>
    
        </Column>

    ) ;
}
ParticipantManagementSelector.propTypes={
    type: PropTypes.string
}

export default ParticipantManagementSelector;