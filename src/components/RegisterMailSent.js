import React from "react";
import { withTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import VerticalSteps from "./VerticalSteps";

const RegisterMailSent = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const formType = new URLSearchParams(location.search).get("formType");

    const goHome = () => {
        navigate("/");
    }

    const formOrganizationOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t(`form.${formType}FormEmailSentHelp`)}</p>
            </div>
            <VerticalSteps current="3" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formEmailSentMessage")}</p>
                <div className="formButtons">
                     <button onClick={goHome}>{props.t("form.ok")}</button>
                 </div>
            </div>
        </div>
        )
    };

    return (
        <Modal>
                {formOrganizationOne()}
        </Modal>
    
    );

}

export default withTranslation()(RegisterMailSent);