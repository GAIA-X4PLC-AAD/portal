import React, {useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import axios from "axios";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";
import configData from "../config/config.json";
import AuthPolling from "./AuthPolling";

const RegisterUserViaDid = (props) => {

    const [img, setImg] = useState({});

    useEffect(  () => {
        axios.get(configData.ONBOARDING_API_URI+`/register/user/did_register`)
        .then((body) => {
            let qrCodePath = body.data.qrCodePath;
            setImg(qrCodePath);
        })
    },[img]);

    const onContinue = () => {
        alert("Under construction.");
    }

    const noDid = () => {
        alert("Under construction.");
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

    const formUserViaDid = () => {
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
                        />
                        <img src={img} width="150px" height="150px" alt="Loading..."/>
                    </div>
                    <div className="formButtons">
                        <button disabled type="submit" onClick={onContinue}>{props.t("form.continue")}</button>
                        <button disabled onClick={noDid}>{props.t("form.noDid")}</button>
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

export default withTranslation()(RegisterUserViaDid);
