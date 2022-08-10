import axios from "axios";
import React, { useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionCancelModal from "../../common/ActionCancelModal";
import configData from "../../config/config.json";
import "./ProviderAccount.css";
import UploadCompleted from "./uploadCompleted";
import PropTypes from 'prop-types';
import { BlueButton, BodyText, CancelButton, Column, RedText, Row, Style } from "../../common/styles";

const ProviderEdit = (props) => {

  const [file,setFile] = useState(null);
  const [showLoadCompleted, setShowLoadCompleted] = useState(false);
  const [onRemove, setOnRemove] = useState(false);

    const fileRef = useRef();

    const navigate = useNavigate();

    const onFileChange = (event) => {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }

    const onSaveClick = () => {
      var formData = new FormData();
      formData.append("providerFile", file);

      axios.post(process.env.REACT_APP_EDGE_API_URI + '/account/provider/upload_provider_sd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(   (response) => {
      setShowLoadCompleted(true);
},(error)=> {
      console.log(error);
      alert('ko');
});
    };

    const deleteAccount = () => {
      axios.delete(process.env.REACT_APP_EDGE_API_URI + '/account/provider').then(   
        (response) => {
          navigate("/");
        },(error)=> {
          console.log(error);
          alert('ko');
      });

    };

    return(
        <div className="provider-account-edit__flex layout">
          <div className="provider-account-edit__block9 layout">
            <Column margin='24px' gap='24px'>
              <BodyText>
                {props.t("account.edit.uploadMessage")}
              </BodyText>
              <Row gap="12px">
                <BlueButton marginLeft="0" onClick={()=> fileRef.current.click()}>{props.t("account.edit.upload")}</BlueButton>
                <input type="file" name="selfDescription" ref={fileRef} hidden onChange={onFileChange}/>
                <Style marginTop="auto" marginBottom="auto">
                  {file?.name || ''}
                </Style>
              </Row>
            </Column>
          </div>
          <UploadCompleted showAlertMessage={showLoadCompleted} message={props.t("account.edit.uploadCompletedMessage")}/>
          <ActionCancelModal
                    header={props.t("account.edit.removeAccountHeader")} 
                    message={props.t("account.edit.removeAccountMessage")} 
                    showAlertMessage={onRemove} 
                    actionMessage={props.t("account.edit.remove")}
                    actionCallback={()=>deleteAccount()} 
                    cancelCallback={()=>setOnRemove(false)}/>
          <Row vertical="24px">
            <RedText onClick={()=>setOnRemove(true)}>{props.t("account.edit.removeAccount")}</RedText>
            <Style marginLeft='auto'>
              <CancelButton onClick={()=>navigate("/account/provider/details")}>{props.t("account.edit.cancel")}</CancelButton>
            </Style>
              
            <BlueButton disabled={file===null} onClick={onSaveClick}>{props.t("account.edit.save")}</BlueButton>
          </Row>
        </div>

    );
}

ProviderEdit.propTypes = {
  t: PropTypes.func,
}

export default withTranslation () (ProviderEdit);