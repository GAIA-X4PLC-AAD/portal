import React, {useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import VerticalSteps from "./VerticalSteps";
import AuthPolling from "./AuthPolling";
import axios from "axios";
import configData from "../config/config.json";
import LoginFail from "./login/LoginFail";

import PropTypes from 'prop-types';

const RegisterViaDID = (props) => {

    const navigate = useNavigate();

    const [img, setImg] = useState({});

    const [showLoginFail, setShowLoginFail] = useState(false);

    
    useEffect(  () => {
        axios.get(configData.EDGE_API_URI+`/register/user/did_register`) // RFCT: portal uri is at gaia-x.portal.local:8085 but frontend differs
        .then((body) => {
            let qrCodePath = body.data.qrCodePath;
            setImg(qrCodePath);
        })
    },[img]);


    const onAuthZSuccess = () => {
        // alert('onAuthZSuccess');
        navigate("/register/displayVC");
    }
         
    const onAuthZFailed = () => {
        // alert('onAuthZFailed');
        // navigate("/loginfail");
        setShowLoginFail(true);
    }
      
    const onAuthZWait = () => {
        console.log('onAuthZWait');
    }
    
    const registerViaDID = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t(`form.formOrganizationProofOfOnboarding`)}</p>
            </div>
            <VerticalSteps current="2" numSteps="4"/>
            <div className="registerInputs">
                <p> {props.t("form.formOrganizationPleaseVerifyYourself")}</p>
                <div className="registerViaQrCode">
                        <AuthPolling
                            onAuthZFailed={onAuthZFailed}
                            onAuthZSuccess={onAuthZSuccess}
                            onAuthZWait={onAuthZWait}
                            statusURL={configData.EDGE_API_URI + configData.uri_path.auth_status_path}
                        />
                        <LoginFail showAlertMessage={showLoginFail} message={props.t("form.formOrganizationNoProcuraError")}/>
                        <img src={img} width="150px" height="150px" alt="Loading..."/>
                    </div>
                <div className="formButtons">
                    <button onClick={() => navigate("/register/IdP?mock=organization")}>{props.t("form.regViaDIDNoDID")}</button>
                 </div>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {registerViaDID()}
        </Modal>
    
    );

}

RegisterViaDID.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(RegisterViaDID);