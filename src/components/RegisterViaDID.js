import React from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import VerticalSteps from "./VerticalSteps";

const RegisterViaDID = (props) => {

    const navigate = useNavigate();

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
                <iframe width="241px" height="243px">
                </iframe>
                <div className="formButtons">
                    <button onClick={() => navigate("/register/IdP")}>{props.t("form.regViaDIDNoDID")}</button>
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

export default withTranslation()(RegisterViaDID);