import React, {useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";
import "./Register.css";
import VerticalSteps from "../../common/vertical_steps/VerticalSteps";
import configData from "../../config/config.json";
import AuthPolling from "../AuthPolling";

import PropTypes from 'prop-types';

const RegisterUserViaDid = (props) => {

    const navigate = useNavigate();
    const [img, setImg] = useState({});

    useEffect(  () => {
        axios.get(configData.EDGE_API_URI+`/register/user/did_register`)
        .then((body) => {
            let qrCodePath = body.data.qrCodePath;
            setImg(qrCodePath);
        })
    },[img]);

    const onContinue = () => {
        alert("Under construction.");
    }

    const noDid = () => {
        navigate("/register/IdP?mock=user")
    }

    const onAuthZSuccess = () => {
        alert('onAuthZSuccess');
    }
         
    const onAuthZFailed = () => {
        alert('onAuthZFailed');
    }
      
    const onAuthZWait = () => {
        console.log('onAuthZWait');
    }

    const formUserViaDid = () => { // RFCT submit button to use navigate and new uri
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserDidRegHelp")}</p>
            </div>
            <VerticalSteps current="2" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formUserDidReg")}</p>
                <form className="registerFormUser" noValidate>
                    <div className="registerViaQrCode">
                        <AuthPolling
                            onAuthZFailed={onAuthZFailed}
                            onAuthZSuccess={onAuthZSuccess}
                            onAuthZWait={onAuthZWait}
                            statusURL={configData.EDGE_API_URI + configData.uri_path.auth_status_path}
                        />
                        <img src={img} width="150px" height="150px" alt="Loading..."/>
                    </div>
                    <div className="formButtons">
                        <button type="submit" onClick={() => navigate("/register/displayVC?mock=user")}>{props.t("form.continue")}</button>
                        <button onClick={noDid}>{props.t("form.noDid")}</button>
                    </div>
                </form>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {formUserViaDid()}
        </Modal>
    );
}

RegisterUserViaDid.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(RegisterUserViaDid);
