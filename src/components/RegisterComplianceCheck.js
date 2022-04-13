import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import VerticalSteps from "./VerticalSteps";
import Modal from "../Modal";
import configData from "../config/config.json";

const RegisterComplicanceCheck = (props) => {

    const navigate = useNavigate();
    const [input, setInput] = useState({});

    useEffect( () => {
        const timeoutId = setTimeout( () => {},500);
        return () => clearTimeout(timeoutId);
    },[input]);

    useEffect(() => {const callback = (e) => {e.preventDefault()}

	window.addEventListener('submit', callback)
	return () => window.removeEventListener('submit', callback)
    }, [])

    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setInput(values => ({...values, [key]: value}))
    }

    const formComplianceCheck = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formComplianceCheck")}</p>
            </div>
            <VerticalSteps current="4" numSteps="4"/>
            <div className="registerInputs">
            <p> {props.t("form.formComplianceCheckHeading")}</p>
            <form className="registerFormUser" noValidate>
            <input type="email" name="email" value={input.email || ""} onChange={onFormChanged} placeholder={props.t("form.lEmail")} required />
            <div className="formButtons">
            <button>Back</button>
            <button onClick={() => navigate("/")}>{props.t("form.finish")}</button>
            </div>
            </form>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {formComplianceCheck()}
        </Modal>
    );
}

export default withTranslation()(RegisterComplicanceCheck);