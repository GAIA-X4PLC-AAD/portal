import React from "react";
import {  BodySmallText, CaptionTeleNeoText, Column, Style, Tag, WrapRow } from "../../../common/styles";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import { CaptionText, DetailsContainer, ElementGroup, Row } from "../style";
import { useTranslation } from "react-i18next";
import ApproveButton from "./buttons/ApproveButton";
import DenyButton from "./buttons/DenyButton copy";

const KeyValueDetails = ({id, url_prefix, searchRefresh}) => {

const URL = `${url_prefix}/${id}/details`;


    const {t} = useTranslation();

    const showItemElements = (items) => {
        return (items.map((item, i) => {return( 
            <ElementGroup key={i}>
                <CaptionTeleNeoText>{item.name}</CaptionTeleNeoText>
                <BodySmallText color='#1C0E15'>{item.value}</BodySmallText>
            </ElementGroup>)}));
    }

    const showAttachments = (attachments) => {
        if (!attachments) return null;
        return (
            <ElementGroup>
                <CaptionText>{t('admin.attachments')}</CaptionText>
                <WrapRow>
                        {attachments.map((attachment, i) => {return( <Style marginTop='8px' key={i}><Tag>{attachment.name}</Tag></Style>
                        )})}
                </WrapRow>
             </ElementGroup>
        );
    }
    const DenyApprovalButton = () => {
        if (!(searchRefresh)) return null;
        return (
            <Row>
                <Style marginRight="auto" marginTop="42px">
                    <DenyButton id={id} searchRefresh={searchRefresh}/>
                    <ApproveButton id={id} searchRefresh={searchRefresh}/>
                </Style>
             </Row>
        );
    }

    const successView = ({data}) => {
        const person = data;
        if (!person) return null;
        return (
                <DetailsContainer>
                <Column>
                    {showItemElements(person.items)}
                    {showAttachments(person?.attachments)}
                    {DenyApprovalButton()}
                </Column>
                </DetailsContainer>
        );

    }

    return (
        <LoadingView url={URL} successView={successView}/>);

}

KeyValueDetails.propTypes = {
    id: PropTypes.string,
    url_prefix: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default KeyValueDetails;