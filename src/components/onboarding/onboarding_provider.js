import axios from "axios";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import Checkbox from "../../common/checkbox";
import {  Column, Row, Style, Card, BodyText, ButtonText, H4LightText, HorizontalLine, OutlineButton, TextInput, Image } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DidOnboardingView from "./onboarding_did";
import { useTranslation } from "react-i18next";
import Modal from "../../Modal";

const OrganizationDetailsView = ({onSuccess}) => {

    const {t} = useTranslation();

    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/organization/';

  const fileRef = React.createRef();
  const formRef = React.createRef();

  const [input, setInput] = useState({});
  const [eMessage,setEMessage] = useState('');
  const [did, setDid] = useState(false);

  useEffect (() => {
    console.log('eMessage effect', eMessage);
  }, [eMessage]);

 const getValue = (target) => {
    switch (target.type) {
        case "checkbox": return target.checked;
        case 'file': return target.files[0];
        default: return target.value;
      }
 }

  const onFormChanged = (e) => {
      const key = e.target.name;
      const value = getValue(e.target);
      setInput(values => ({ ...values, [key]: value }))
  }


    const onFormSubmit = () => {
        console.log(input.document);
        if (!input.document) {
            setEMessage(t('onboarding.missing_file'));
        }  else if (formRef.current.reportValidity())
        {
            let formData = new FormData();
            formData.append('name', input.name);
            formData.append('email', input.email);
            formData.append('aisbl', input.aisbl||false);
            formData.append('document', input.document);
             axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then (
                    response => {
                        onSuccess();
                    }, 
                    error => {
                        console.log(error);
                        setEMessage(error.response.data);

                    });
        }
    }

    const onError = (eMessage) => {
        if (eMessage || eMessage != '') {
                return (
                    <Modal>
                      <div className="login-fail-flex-col">
                        <div className='login-fail-header'>{t("onboarding.errorHeader")}</div>
                        <div className='login-fail-content'>
                        {eMessage}
                        </div>
                        <div className='login-fail-footer'>
                          <button className="gaiax-button" onClick={()=>{setEMessage('')}}>
                            {t('onboarding.close')}
                          </button>
                        </div>
                      </div>
                    </Modal>
                  );
        }
    }
   
    const organizationDetailsFormView = () => {
    return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>{t('onboarding.organization_headline')}</H4LightText>
                        <HorizontalLine />
                        <Padding vertical='24px'>
                             <form  ref={formRef} noValidate>
                            <Column>
                                <BodyText>{t('onboarding.organization_body_text')}</BodyText>
                                <input name='document' type="file" ref={fileRef} onChange={e=> onFormChanged(e)} hidden/>
                                <Padding vertical='16px' alignSelf='start' onClick={e=>fileRef.current.click()}><OutlineButton>Upload</OutlineButton></Padding>
                                <Padding vertical='16px' />
                                <TextInput name='name' type="text" value={input.name||''}  placeholder={t('onboarding.organization_name_placeholder')}  onChange={(e)=>onFormChanged(e)} required/>
                                <Padding vertical='4px' />
                                <TextInput name='email' type="email" value={input.email||''} placeholder={t('onboarding.email_placeholder')}  onChange={(e)=>onFormChanged(e)} required/>
                                <Padding vertical='8px' />
                                {/* Checkbox */}
                                <Row alignItems='center'>
                                    <label>
                                        <Checkbox name='aisbl'
                                            checked={input.aisbl||false}
                                            onChange={(event) => { onFormChanged(event) }}
                                        />
                                    </label>
                                    <Padding horizontal='4px' />
                                    <BodyText>{t('onboarding.organization_aisbl')}</BodyText>
                                    <Padding horizontal='7px' />
                                    <Image objectFit='contain' src='/images/question-mark.svg' />
                                </Row>

                                <Padding vertical='28px'>
                                    <Row>
                                        <OutlineButton onClick={()=> setDid(true)}>{t('onboarding.register_did_button')}</OutlineButton>
                                        <Padding horizontal='10px' />
                                        <OutlineButton onClick={e=>onFormSubmit()}>{t('onboarding.send_button')}</OutlineButton>
                                    </Row>
                                </Padding>
                            </Column>
                                </form>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
        {onError(eMessage)}
    </>
    }

    return did? <DidOnboardingView /> : organizationDetailsFormView();
}

OrganizationDetailsView.propTypes = {
    onSuccess: PropTypes.func
}

export default OrganizationDetailsView;