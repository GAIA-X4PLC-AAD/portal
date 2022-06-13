import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import Modal from "../../Modal";
import "./Register.css";
import VerticalSteps from "../../common/vertical_steps/VerticalSteps";
import configData from "../../config/config.json";

import PropTypes from 'prop-types';

const RegisterUser = (props) => {

    const navigate = useNavigate();
    const [input, setInput] = useState({});

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            validateUser(input);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [input]);

    useEffect(() => {
        const callback = (e) => {
            e.preventDefault()
        }
        window.addEventListener('submit', callback)
        return () => window.removeEventListener('submit', callback)
    }, [])

    const validateUser = (input) => {
        /* place for custom validation per keystroke
        console.log(`validate User on ${Object.entries(input).map(entry => `${entry[0]}: ${entry[1]}\n` )}`)
             */
        return true;
    }

    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setInput(values => ({ ...values, [key]: value }))
    }

    const onFormSubmit = async () => {
        var form = document.querySelector(".registerFormUser")
        if (form.reportValidity()) {
            /* place custom validation on submit */
            console.log("request: " + JSON.stringify(input));
            const output = await axios.post(configData.EDGE_API_URI + '/onboarding/register/user', input);
            switch (output.status) {
                case 204:
                case 200:
                    navigate("/register/email?formType=user");
                    break;
                default:
                    alert(`Error with status ${output.status} and message: ${output.statusText}`);
            }
            console.log(output);
        }
    }

    const cancelButton = () => {
        navigate("/");
    }

    const onRegisterDID = () => {
        navigate("/register/user/viadid");
    }

    const formUserOne = () => {
        return (
            <div className="RegisterUser">
                <div className="registerHelpText">
                    <h3>{props.t("form.formUserHeadline")}</h3>
                    <p>{props.t("form.formUserOne")}</p>
                </div>
                <VerticalSteps current="2" numSteps="3" />
                <div className="registerInputs">
                    <form className="registerFormUser" noValidate>
                        <input type="text" name="firstname" value={input.firstname || ""} onChange={onFormChanged} placeholder={props.t("form.lFirstName")} required />
                        <input type="text" name="lastname" value={input.lastname || ""} onChange={onFormChanged} placeholder={props.t("form.lLastName")} required />
                        <input type="email" name="email" value={input.email || ""} onChange={onFormChanged} placeholder={props.t("form.lEmail")} title={props.t("form.formUserTitleEmail")} required />
                        <input type="text" name="phone_number" value={input.phone_number || ""} onChange={onFormChanged} placeholder={props.t("form.lPhone")} required />
                        <input type="text" name="street_number" value={input.street_number || ""} onChange={onFormChanged} placeholder={props.t("form.lStreetnNumber")} required />
                        <input type="text" name="zip" value={input.zip || ""} onChange={onFormChanged} placeholder={props.t("form.lZIP")} required />
                        <input type="text" name="city" value={input.city || ""} onChange={onFormChanged} placeholder={props.t("form.lCity")} required />
                        <input type="text" name="country" value={input.country || ""} onChange={onFormChanged} placeholder={props.t("form.lCountry")} required />
                        <div className="formButtons">
                            <button onClick={onRegisterDID}>{props.t("form.registerDid")}</button>
                            <button type="submit" onClick={onFormSubmit}>{props.t("form.continue")}</button>
                            <button onClick={cancelButton}>{props.t("form.cancel")}</button>
                        </div>
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

RegisterUser.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(RegisterUser);
