import axios from "axios";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import Checkbox from "../../common/checkbox";
import {  Column, Row, Style, Card, BodyText, ButtonText, H4LightText, HorizontalLine, OutlineButton, TextInput, Image } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";

const OrganizationDetailsView = ({onSuccess}) => {

    const URL = process.env.REACT_APP_EDGE_API_URI + '/onboarding/register/organization/';

  const fileRef = React.createRef();
  const formRef = React.createRef();

  const [input, setInput] = useState({});
  const [eMessage,setEMessage] = useState('');

 const getValue = (target) => {
    switch (target.type) {
        case "checkbox": return target.checked;
        case 'file': return target.files[0];
        default: return target.value;
      }
 }

  const onFormChanged = (e) => {
    console.log('e.target.name: ' , e.target.name);
    console.log('e.target.value: ' , e.target.value);
      const key = e.target.name;
      const value = getValue(e.target);
      setInput(values => ({ ...values, [key]: value }))
  }


    const onFormSubmit = () => {
        if (formRef.current.reportValidity())
        {
            console.log("Submit button was clicked so we'll submit the form");
            axios.post(URL, input, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then (
                    response => {
                        //move to next step
                        onSuccess();
                    }, 
                    error => {
                        console.log(error);
                        setEMessage(error.response.data);
                        // remove onSuccess call
                        onSuccess ();
                    });
        }
    }

    return <>
        <Style width='633px' height='246px'>
            <Padding horizontal='20px'>
                <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                    <Padding horizontal='24px'>
                        <H4LightText>Do you want to register as a customer or provider?</H4LightText>
                        <ButtonText color='#00A2E4'>Learn more</ButtonText>
                        <HorizontalLine />
                        <Padding vertical='24px'>
                             <form  ref={formRef} noValidate>
                            <Column>
                                <BodyText>Please upload your organization details or select express registration via DID.</BodyText>
                                <input name='file' type="file" ref={fileRef} onChange={e=> onFormChanged(e)} hidden/>
                                <Padding vertical='16px' alignSelf='start' onClick={e=>fileRef.current.click()}><OutlineButton>Upload</OutlineButton></Padding>
                                <Padding vertical='16px' />
                                <TextInput name='name' type="text" value={input.name||''}  placeholder="Organization Name"  onChange={(e)=>onFormChanged(e)} required/>
                                <Padding vertical='4px' />
                                <TextInput name='email' type="email" value={input.email||''} placeholder="Email"  onChange={(e)=>onFormChanged(e)} required/>
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
                                    <BodyText>Apply for AISBL Membership</BodyText>
                                    <Padding horizontal='7px' />
                                    <Image objectFit='contain' src='/images/question-mark.svg' />
                                </Row>

                                <Padding vertical='28px'>
                                    <Row>
                                        <OutlineButton>Registration via DID</OutlineButton>
                                        <Padding horizontal='10px' />
                                        <OutlineButton onClick={e=>onFormSubmit()}>Send</OutlineButton>
                                    </Row>
                                </Padding>
                            </Column>
                                </form>
                        </Padding>
                    </Padding>
                </Card>
            </Padding>
        </Style>
    </>
}

OrganizationDetailsView.propTypes = {
    onSuccess: PropTypes.func
}

export default OrganizationDetailsView;