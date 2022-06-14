import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Account.css";
import configData from "../../config/config.json";
import PropTypes from 'prop-types';

const AccountPaneDetails = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_EDGE_API_URI + '/account/user').then((response) => {
            console.log(response.data);
            setUser(response.data);
        }, (error) => {
            alert('ko');
        });
    }, []);

    return (
        <div className="account-pane-details">
            <div className="account-pane-details-image">
                <img src={user?.avatarImageLink} alt="User avatar image." />
            </div>
            <div className="account-pane-details-body">
                <div className="account-pane-details-body-flex-col">
                    <div className="account-pane-details-attribute">
                        <div className="account-pane-details-attribute-label">{props.t("account.details.email")}</div>
                        <div className="account-pane-details-attribute-box">{user?.email}</div>
                    </div>
                    <div className="account-pane-flex">
                        <div className="account-pane-details-attribute">
                            <div className="account-pane-details-attribute-label">{props.t("account.details.firstName")}</div>
                            <div className="account-pane-details-attribute-box">{user?.name}</div>
                        </div>
                        <div className="account-pane-details-attribute">
                            <div className="account-pane-details-attribute-label">{props.t("account.details.lastName")}</div>
                            <div className="account-pane-details-attribute-box">{user?.surname}</div>
                        </div>
                    </div>
                    <div className="account-pane-details-attribute">
                        <div className="account-pane-details-attribute-label">{props.t("account.details.attributeOfVC")}</div>
                        <div className="account-pane-details-attribute-box">{user?.attributeA}</div>
                    </div>
                    <div className="account-pane-details-attribute">
                        <div className="account-pane-details-attribute-label">{props.t("account.details.attributeOfVC")}</div>
                        <div className="account-pane-details-attribute-box">{user?.attributeB}</div>
                    </div>
                    <div className="account-pane-details-attribute">
                        <div className="account-pane-details-attribute-label">{props.t("account.details.attributeOfVC")}</div>
                        <div className="account-pane-details-attribute-box">{user?.attributeC}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AccountPaneDetails.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(AccountPaneDetails);
