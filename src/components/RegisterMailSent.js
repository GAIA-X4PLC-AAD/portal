import React from "react";
import { withTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Modal from "../Modal";
import VerticalSteps from "./VerticalSteps";

const RegisterMailSent = (props) => {

    const location = useLocation();
    const formType = new URLSearchParams(location.search).get("formType");

    const formEmailSend = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t(`form.${formType}FormEmailSentHelp`)}</p>
            </div>
            <VerticalSteps current="3" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formEmailSentMessage")}</p>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {formEmailSend()}
        </Modal>
    
    );

}

export default withTranslation()(RegisterMailSent);