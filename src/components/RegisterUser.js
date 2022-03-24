import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";

const RegisterUser = (props) => {

    const navigate = useNavigate();
    const [input, setInput] = useState({});

    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [key]: value}))
    }

    /* NOTE: used on last form page */
    const onFormSubmit = (e) => {
        e.preventDefault();
        alert(Object.entries(input).map(entry => `${entry[0]}: ${entry[1]}\n` ));
    }

    const cancelButton = () => {
        navigate("/");
    }

    const nextFormPage = () => {
        alert(Object.entries(input).map(entry => `${entry[0]}: ${entry[1]}\n` ));
    };

    const formUserOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserOne")}</p>
            </div>
            <VerticalSteps current="2" numSteps="3"/>
            <div className="registerInputs">
                <form onSubmit={onFormSubmit} className="registerFormUser">
                    <label htmlFor="firstName">{props.t("form.lFirstName")}:</label>
                    <input type="text" name="firstName" value={input.firstName || ""} onChange={onFormChanged} />
                    <label htmlFor="lastName">{props.t("form.lLastName")}:</label>
                    <input type="text" name="lastName" value={input.lastName || ""} onChange={onFormChanged} />
                    <label htmlFor="email">{props.t("form.lEmail")}:</label>
                    <input type="text" name="email" value={input.email || ""} onChange={onFormChanged} />
                    <label htmlFor="phone">{props.t("form.lPhone")}:</label>
                    <input type="text" name="phone" value={input.phone || ""} onChange={onFormChanged} />
                    <label htmlFor="streetnNumber">{props.t("form.lStreetnNumber")}:</label>
                    <input type="text" name="streetnNumber" value={input.streetnNumber || ""} onChange={onFormChanged} />
                    <label htmlFor="zipncity">{props.t("form.lZIPnCity")}:</label>
                    <input type="text" name="zipncity" value={input.zipncity || ""} onChange={onFormChanged} />
                    <label htmlFor="country">{props.t("form.lCountry")}:</label>
                    <input type="text" name="country" value={input.country || ""} onChange={onFormChanged} />
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

export default withTranslation()(RegisterUser);