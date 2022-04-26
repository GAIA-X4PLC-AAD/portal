import axios from "axios";
import React, { useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import configData from "../../config/config.json";
import "./ProviderAccount.css";


const ProviderEdit = (props) => {

  const [file,setFile] = useState(null);

    const fileRef = useRef();

    const navigate = useNavigate();

    const onFileChange = (event) => {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }

    const onSaveClick = () => {
      var formData = new FormData();
      formData.append("providerFile", file);

      axios.post(configData.EDGE_API_URI + '/api/upload_provider_sd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(   (response) => {
      alert('ok');
},(error)=> {
      alert('ko');
});
    }

    return(
        <div className="provider-account-edit__flex layout">
          <div className="provider-account-edit__block9 layout">
            <div className="provider-account-edit__flex1 layout">
              <h4 className="provider-account-edit__highlights10 layout">
                {props.t("account.edit.uploadMessage")}
              </h4>
              <div className="provider-account-edit__block10 layout" onClick={()=> fileRef.current.click()}>
                <input type="file" name="selfDescription" ref={fileRef} hidden onChange={onFileChange}/>
                <h4 className="provider-account-edit__highlights1 layout">
                  {props.t("account.edit.upload")}
                </h4>
              </div>
            </div>
          </div>
          <div className="provider-account-edit__flex2 layout">
            <h4 className="provider-account-edit__highlights9 layout">
              {props.t("account.edit.removeAccount")}          
            </h4>
            <div className="provider-account-edit__flex2-spacer"></div>
            <div className="provider-account-edit__flex2-item margin_left_auto">
              <div className="provider-account-edit__block8 layout" onClick={()=>navigate("/account/provider/details")}>
                <h4 className="provider-account-edit__highlights8 layout">
                {props.t("account.edit.cancel")}
                </h4>
              </div>
            </div>
            <div className="provider-account-edit__flex2-spacer"></div>
            <div className="provider-account-edit__flex2-item">
              <div className="provider-account-edit__block7 layout" disabled={file===null} onClick={onSaveClick}>
                <h4 className="provider-account-edit__highlights1 layout1">
                  {props.t("account.edit.save")}
                </h4>
              </div>
            </div>
          </div>
        </div>

    );
}

export default withTranslation () (ProviderEdit);