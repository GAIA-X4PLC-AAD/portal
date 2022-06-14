import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";
import configData from "../../config/config.json";

import PropTypes from 'prop-types';

const RegisterViaDIDIdP = (props) => {

    const navigate = useNavigate();
    const [idPList,setidPList] = useState([]);
    const queryParams = useLocation().search;
    const mock = new URLSearchParams(queryParams).get("mock")

    const getIdPList = () => {
        axios.get(process.env.REACT_APP_EDGE_API_URI + configData.uri_path.idp_list + "?requestID=" + mock).
            then(
                (response) => {setidPList(response.data);
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
                {idPList.map((item, idx) => {
                    return (
                        <div className="registerIdP-col" key={idx}>
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