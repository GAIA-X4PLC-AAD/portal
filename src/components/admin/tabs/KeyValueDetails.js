import axios from 'axios';
import fileDownload from 'js-file-download';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingViewDeprecated from '../../../common/components/loadingIndicator/LoadingViewDeprecated';
import { BodySmallText, CaptionTeleNeoText, Column, Style, TagLink, WrapRow } from '../../../common/styles';
import { CaptionText, DetailsContainer, ElementGroup, Row } from '../style';

import ApproveButton from './buttons/ApproveButton';
import DenyButton from './buttons/DenyButton copy';

const KeyValueDetails = ({ id, url_prefix, searchRefresh }) => {

  const URL = `${url_prefix}/${id}/details`;

  const downloadFile = (url, filename) => {
    axios.get(process.env.REACT_APP_EDGE_API_URI.replace('/api', '') + url,   {
      responseType: 'blob',
    }).then(
      response => {
        fileDownload(response.data, filename);
        // fileDownload(response.data, `${_name}.log`);
      }, error => {
        console.error(error);
      })
  }

  const { t } = useTranslation();

  const showSelfDescription = (sd_data) => {
    if (!sd_data) {return null;}
    const attributes = sd_data.flatMap((a) => a.attributes)
    return showItemElements(attributes);
  }

  const showItemElements = (items) => {
    if (!items) {return null;}
    return (items.map((item, i) => {
      return (
        <ElementGroup key={i}>
          <CaptionTeleNeoText>{item.name}</CaptionTeleNeoText>
          <BodySmallText color='#1C0E15'>{item.value}</BodySmallText>
        </ElementGroup>)
    }));
  }

  const showAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) {
      return <></>
    }
    return (
      <ElementGroup>
        <CaptionText>{t('admin.attachments')}</CaptionText>
        <WrapRow>
          {attachments.map((attachment, i) => {
            return (
              <Style marginTop='8px' key={i}>
                <TagLink
                  onClick={() => downloadFile(attachment.url, attachment.name)}
                  data-tip={t('admin.tooltip.download')}
                >
                  {attachment.name}
                </TagLink>
              </Style>
            )
          })}
        </WrapRow>
      </ElementGroup>
    );
  }

  const DenyApprovalButton = () => {
    if (!(searchRefresh)) {return null;}
    return (
      <Row>
        <Style marginRight="auto" marginTop="42px">
          <DenyButton id={id} searchRefresh={searchRefresh} />
          <ApproveButton id={id} searchRefresh={searchRefresh} />
        </Style>
      </Row>
    );
  }

  const successView = ({ data }) => {
    const person = data;
    if (!person) {return null;}
    return (
      <DetailsContainer>
        <Column>
          {showItemElements(person && person.items ? person.items : null)}
          {showSelfDescription(person && person.sd_data ? person.sd_data : null)}
          {showAttachments(person && person.attachments ? person.attachments : null)}
          {DenyApprovalButton()}
        </Column>
      </DetailsContainer>
    );

  }

  return (
    <LoadingViewDeprecated url={URL} successView={successView}/>);

}

KeyValueDetails.propTypes = {
  id: PropTypes.string,
  url_prefix: PropTypes.string,
  searchRefresh: PropTypes.func
}

export default KeyValueDetails;
