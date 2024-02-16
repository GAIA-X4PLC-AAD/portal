import { RadioButton } from "./style.js";
import React from "react";
import { BodyText, Column, Row } from "../../common/styles.js";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const ParticipantManagementSelector = ({type}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (<Column $margin="24px 0">
                <Row $margin="24px 0">
                    <RadioButton 
                        type="radio"
                        name="radio"
                        value="neverAutoAccept" 
                        onClick={()=>navigate('/admin/participant')}
                        defaultChecked={type==='participant'}
                        /> <BodyText>{t('admin.participant')}</BodyText>
                </Row>
                <Row>
                    <RadioButton  
                        type="radio"
                        name="radio"
                        value="neverAutoAccept"
                        onClick={()=>navigate('/admin/management')}
                        defaultChecked={type==='management'}/><BodyText>{t('admin.management')}</BodyText>
                </Row>
    
        </Column>

    ) ;
}
ParticipantManagementSelector.propTypes={
    type: PropTypes.string
}

export default ParticipantManagementSelector;