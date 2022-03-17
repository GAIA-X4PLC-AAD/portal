import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";

const Register = (props) => {


    const [input, setInput] = useState({});
    const [formIndex, setFormIndex] = useState(0);

    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [key]: value}))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        alert(Object.entries(input).map(entry => `${entry[0]}: ${entry[1]}\n` ));
    }

    const nextFormPage = () => {
        setFormIndex(formIndex + 1);
    };

    const prevFormPage = () => {
        setFormIndex(formIndex - 1);
    };


    const formUserOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserOne")}</p>
            </div>
            <div className="registerInputs">
            <form onSubmit={onFormSubmit}>
                <input id="regUser" type="radio" name="registerType" value="User" onChange={onFormChanged} />
                <label htmlFor="regUser">{props.t("form.user")}</label>
                <br />
                <input id="regOrganization" type="radio" name="registerType" value="Organization" onChange={onFormChanged} />
                <label htmlFor="regOrganization">{props.t("form.organization")}</label>
                <br />
                <button onClick={nextFormPage}>{props.t("form.continue")}</button>
            </form>
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