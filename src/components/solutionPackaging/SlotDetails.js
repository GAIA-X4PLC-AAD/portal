import React from "react";
import PropTypes from 'prop-types';
import * as S from "../../common/styles";
import { useTranslation } from "react-i18next";
import { AvailabeServices, SlotBox } from "./style";

const SlotDetails = ({service, onRemove, onAdd, selected}) => {

    const {t} = useTranslation();

    const openLink =  (url) => {
        window.open(url, '_blank').focus();
    }

    const Availabe = ({available_services}) => {
        return (
            <AvailabeServices>
            <S.CaptionText>
                {t('solution_pkg.a_s', {as: available_services})}
            </S.CaptionText>
        </AvailabeServices>
        );
    }
    Availabe.propTypes = {
        available_services: PropTypes.number
    }
    
    const emptySlot = (service) => {
        return (
            <S.Column>
               <SlotBox selected={selected}>
                <S.BlueLinkText onClick={onAdd}>
                    <S.Style textAlign="left">
                        {selected?t('solution_pkg.selectMessage'):t('solution_pkg.add')}
                    </S.Style>                        
                </S.BlueLinkText>
                </SlotBox>
                <Availabe available_services={service.available_services}/>
            </S.Column>
        );
    }

    if (!service.id) return emptySlot(service);
    return (
        <S.Column>
            <SlotBox selected={selected}>
                <S.Column height="100%">
                    <S.Style marginBottom="auto" textAlign="left">
                        <S.Image src={service.img_preview_url} alt={service.name} width='201px' height='134px'/>
                        <S.H4Text>{service.name}</S.H4Text>
                        <S.BlueLinkText><S.Style textAlign="left" overflowWrap='anywhere' onClick={()=>{openLink(service.ppr_url)}}>{service.ppr_url}</S.Style></S.BlueLinkText>
                        <S.Style marginTop="10px">
                            <S.BodySmallText>{service.description}</S.BodySmallText>
                        </S.Style>
                    </S.Style>
                    <S.Row margin="0 auto 0 0" onClick={onRemove}>
                        <S.BlueLinkText>
                            <S.Style textAlign="left">
                            {t('solution_pkg.remove')}
                            </S.Style>                        
                            
                        </S.BlueLinkText>
                        <S.Style marginLeft ="15px">
                            <S.Image src='/images/X_image.svg' />    
                        </S.Style>                       
                    </S.Row>
                </S.Column>
            </SlotBox>    
            <Availabe available_services={service.available_services}/>
        </S.Column>
    );
    
}
SlotDetails.propTypes = {
    service: PropTypes.object,
    onRemove: PropTypes.func,
    onAdd: PropTypes.func,
    selected: PropTypes.bool
}

export default SlotDetails;