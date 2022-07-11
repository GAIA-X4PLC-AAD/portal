import React from "react";
import { useTranslation } from "react-i18next";
import { SlotBox } from "./style";
import * as S from "../../common/styles";
import PropTypes from "prop-types";

const ServicePreview = ({ service , onSelect}) => {
    const { t } = useTranslation();

    const onSelectFunction = () => {
//        onSelect(service.id);
    }
    console.log("ServicePreview", service);
    return (
        <SlotBox>
            <S.Column height="100%">
                <S.Style marginBottom="auto" textAlign="left">
                    {/*<S.Image src={service.img_preview_url} alt={service.name} width='201px' height='134px'/>*/}
                    <S.H4Text>{service.name}</S.H4Text>
                    <S.BlueLinkText><S.Style textAlign="left" onClick={()=>{openLink(service.ppr_url)}}>{service.ppr_name}</S.Style></S.BlueLinkText>
                    <S.Style marginTop="10px">
                        {/*<S.BodySmallText>{service.description}</S.BodySmallText>*/}
                    </S.Style>
                </S.Style>
                <S.Row margin="0 auto 0 0">
                    <S.BlueButton onClick={onSelectFunction}>
                            Select
                    </S.BlueButton>
                </S.Row>
            </S.Column>
        </SlotBox>    
    );
}
ServicePreview.propTypes = {
    service: PropTypes.object,
    onSelect: PropTypes.func
}

export default ServicePreview;