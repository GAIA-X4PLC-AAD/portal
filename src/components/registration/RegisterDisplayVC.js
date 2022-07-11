import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import VerticalSteps from "../../common/vertical_steps/VerticalSteps";
import Modal from "../../Modal";
import configData from "../../config/config.json";

import PropTypes from 'prop-types';

const RegisterDisplayVC = (props) => {

    const navigate = useNavigate();
    const [vrVC,setVRVC] = useState([]);
    const queryParams = useLocation().search;
    const mock = new URLSearchParams(queryParams).get("mock")
    const mockPath = mock === "user" ? configData.uri_path.mock_vc_user : configData.uri_path.mock_vc_organization

    const getVRVC = () => {
        axios.get(process.env.REACT_APP_EDGE_API_URI + mockPath).
            then(
                (response) => {
                    setVRVC(response.data);
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
                <p>{mock === "user" ? props.t("form.formDisplayVCUser") : props.t("form.formDisplayVC")}</p>
            </div>
            <VerticalSteps current="3" numSteps="4"/>
            <div className="registerInputs">
            <p> {mock === "user" ? props.t("form.formDisplayVCHeadingUser") : props.t("form.formDisplayVCHeading")}</p>
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

RegisterDisplayVC.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(RegisterDisplayVC);