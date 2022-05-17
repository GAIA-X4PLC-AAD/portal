import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../Modal";
import configData from "../config/config.json";

import PropTypes from 'prop-types';

const RegisterViaDIDIdP = (props) => {

    const navigate = useNavigate();
    const [idPList,setidPList] = useState([]);

    const getIdPList = () => {
        axios.get(configData.WIREMOCK_API_URI + '/auth/identity/provider').
            then(
                (response) => { setidPList(response.data.IdPList);
            },(error)=> {
                alert(`Error with status ${error.response.status} and message:\n ${error.response.data}`);
        });
    }

    useEffect(()=>{
        getIdPList();
    },[]);
    
    const IdentityProviderList = () => {
        return (
        <div className="identityProviderList">
            <h4>{props.t("form.regViaDIDIdPHeading")}</h4>
            <div className="registerIdP-list">
                {idPList.map((item) => {
                    return (
                        <div key={item['id']} className="registerIdP-col">
                            <div><span className="mock-logo">logo</span>{item.name}</div><a href={item.link}>Link</a>
                        </div>
                    );
                })}
            </div>
            <div className="formButtons">
                <button onClick={() => navigate("/")}>{props.t("form.close")}</button>
            </div>
        </div>
        )
    };

    return (
        <Modal>
            {IdentityProviderList()}
        </Modal>
    );

}

RegisterViaDIDIdP.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(RegisterViaDIDIdP);