import axios from "axios";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import {  useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import VerticalSteps from "./VerticalSteps";
import configData from "../config/config.json";

const RegisterConfirmation = (props) => {

    const navigate = useNavigate();
    const {type,key} = useParams();

    const [message, setMessage] = useState("form.confirmationLoading");

    const goHome = () => {
        navigate("/");
    }

    useEffect(()=>{
        axios.get(configData.ONBOARDING_API_URI+`/register/${type}/confirm_email`, { params: {uniqueId: key}}).
        then(
            (reason)=> {setMessage(`form.${type}ConfirmationMessageSuccess`);
        },(error)=> {
                setMessage(`form.${type}ConfirmationMessageError`);
        });
         
    },[]);
   
    const formOrganizationOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.confirmationHelp")}</p>
            </div>
            <VerticalSteps current="3" numSteps="4"/>
            <div className="registerInputs">
                <p> {props.t(message)}</p>
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

export default withTranslation() (RegisterConfirmation);