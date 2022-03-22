import React from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";

const RegisterUser = (props) => {

    const navigate = useNavigate();


    const cancelButton = () => {
        navigate("/");
    }


    const formUserOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserOne")}</p>
            </div>
            <VerticalSteps current="2" numSteps="3"/>
            <div className="registerInputs">
                <p> THis is a placeholder for user register</p>
                <div className="formButtons">
                    <button onClick={cancelButton}>{props.t("form.cancel")}</button>
                </div>
            </div>
        </div>
        )
    };


return (
    <Modal>
            {formUserOne()}
    </Modal>

);

}

export default withTranslation()(RegisterUser);