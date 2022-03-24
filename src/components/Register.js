import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";

const Register = (props) => {

    const navigate = useNavigate();


    const [input, setInput] = useState({});
  
    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [key]: value}))
    }


    const cancelButton = () => {
        navigate("/");
    }
    const nextFormPage = () => {
        switch(input.registerType) {
            case "User":
                navigate("/register/user");
                break;
            case "Organization":
                navigate("/register/organization");
                break;
            default:
                break;
        }
    };

    const formUserOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserOne")}</p>
            </div>
            <VerticalSteps current="1" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formUserOrganization")}</p>
            <form>
                <input id="regUser" type="radio" name="registerType" value="User" onChange={onFormChanged} />
                <label htmlFor="regUser">{props.t("form.user")}</label>
                <br />
                <input id="regOrganization" type="radio" name="registerType" value="Organization" onChange={onFormChanged} />
                <label htmlFor="regOrganization">{props.t("form.organization")}</label>
                <br />
            </form>
                <div className="formButtons">
                    <button onClick={nextFormPage}>{props.t("form.continue")}</button>
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

export default withTranslation()(Register);