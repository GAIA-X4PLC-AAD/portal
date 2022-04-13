import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import VerticalSteps from "./VerticalSteps";
import Modal from "../Modal";
import configData from "../config/config.json";

const RegisterDisplayVC = (props) => {

    const navigate = useNavigate();
    const [vrVC,setVRVC] = useState([]);
    const queryParams = useLocation().search;
    const mock = new URLSearchParams(queryParams).get("mock")
    console.log(queryParams)
    console.log(mock)

    const getVRVC = () => {
        axios.get(configData.WIREMOCK_API_URI + '/auth/identity/mock_did' + mock).
            then(
                (response) => {
                    setVRVC(response.data.DID);
            },(error)=> {
                alert(`Error with status ${error.response.status} and message:\n ${error.response.data}`);
        });
    }

    useEffect(()=>{
        getVRVC();
    },[]);

    const formDisplayVC = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formDisplayVC")}</p>
            </div>
            <VerticalSteps current="3" numSteps="4"/>
            <div className="registerInputs">
            <p> {props.t("form.formDisplayVCHeading")}</p>
            <form className="registerFormUser" noValidate>
                <input placeholder={vrVC.name} disabled="" />
                <input placeholder={vrVC.phone_number} disabled="" />
                <input placeholder={vrVC.email} disabled="" />
                <input placeholder={vrVC.street_number} disabled="" />
                <input placeholder={vrVC.zip} disabled="" />
                <input placeholder={vrVC.city} disabled="" />
            <div className="formButtons">
            <button>Back</button>
            <button onClick={() => navigate("/register/compliance")}>{props.t("form.continue")}</button>
            </div>
            </form>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {formDisplayVC()}
        </Modal>
    );
}

export default withTranslation()(RegisterDisplayVC);