import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";
import axios from "axios";
import configData from "../config/config.json";

const RegisterOrganization = (props) => {

    const navigate = useNavigate();

    const [input, setInput] = useState({});
    const [eMessage,setEMessage] = useState([]);
  
    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [key]: value}));
        validate(input);
    }

    const cancelButton = () => {
        navigate("/");
    }

    const onRegisterDID = () => {
        alert("Register DID is still not done. This is a placeholder alert message.");
    }

    const onSubmit = async () => {
        const output = await axios.post(configData.ONBOARDING_API_URI+'/register/organization', input);
        
        switch (output.status) {
            case 200:  alert("Request successfully done, now next step should be shown. ");
            break;
            default:
                alert(`Error with status ${output.status} and message: ${output.statusText}`);
        }

        console.log(output) ;
    }

    const validate = (organization) => {
        let errMessage = [];
        if (typeof organization.aisbl !== 'boolean' ) {
            errMessage.push("aisbl");
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(organization.email)) {
            errMessage.push("email");
        }
        if (!/^(?!\s*$).+/.test(organization.name)) {
            errMessage.push("name");
        }
        setEMessage(errMessage);
    }

    const onFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            let organization = JSON.parse(e.target.result);
            validate(organization);
            setInput(values=> ({...values, ...organization}));
        };
        reader.readAsText(event.target.files[0]);
    }

    const formOrganizationOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formOrganizationOne")}</p>
            </div>
            <VerticalSteps current="2" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formOrganizationOneInformation")}</p>
                <input type="file" onChange={onFileChange}/>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("name")}>{props.t("form.formOrganizationNameValidationError")}</div>
                <label>{props.t("form.organization")}:
                    <input type="text" name="name" value={input.name || ""} onChange={onFormChanged} />
                </label>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("email")}>{props.t("form.formEmailValidationError")}</div>
                <label>{props.t("form.lEmail")}:
                    <input type="text" name="email" value={input.email || ""} onChange={onFormChanged} />
                </label>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("aisbl")}>{props.t("form.formOrganizationAISBLValidationError")}</div>
                <label>{props.t("form.lAisbl")}:
                    <input type="checkbox" name="aisbl" value={input.aislb || ""}/>
                </label>
                <br/>
                <div className="formButtons">
                     <button onClick={cancelButton}>{props.t("form.cancel")}</button>
                     <button  onClick={onSubmit} disabled={eMessage.length!==0 || Object.keys(input).length===0}>{props.t("form.continue")}</button>
                     <button  onClick={onRegisterDID}>{props.t("form.registerDid")}</button>
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

export default withTranslation()(RegisterOrganization);