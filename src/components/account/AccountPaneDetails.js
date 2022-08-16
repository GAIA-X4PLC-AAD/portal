import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Account.css";
import configData from "../../config/config.json";
import PropTypes from 'prop-types';
import {Circle, ButtonText} from "../../common/styles"

const AccountPaneDetails = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_EDGE_API_URI + '/account/user').then((response) => {
            console.log(response.data);
            setUser(response.data);
        }, (error) => {
            console.error(error);
        });
    }, []);

    const userButton = <Circle background='#ffffff' backgroundColor='#ffffff' borderColor='#E9E9E9'
        radius='141px'
        backgroundImage='/images/identicon.png' isButton borderThickness='1.36667px'>
        <ButtonText fontSize='30px'>{user?.first_name.substring(0, 1) + user?.last_name.substring(0, 1)}</ButtonText>
    </Circle>

    return <div className="account-pane-details">
        <div className="account-pane-details-image">
            {userButton}
            {/* <img src={user?.avatarImageLink} alt="User avatar image." width='143px' height='143px' /> */}
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
                        <div className="account-pane-details-attribute-box">{user?.first_name}</div>
                    </div>
                    <div className="account-pane-details-attribute">
                        <div className="account-pane-details-attribute-label">{props.t("account.details.lastName")}</div>
                        <div className="account-pane-details-attribute-box">{user?.last_name}</div>
                    </div>
                </div>
                <div className="account-pane-details-attribute">
                    <div className="account-pane-details-attribute-label">{props.t("account.details.phone")}</div>
                    <div className="account-pane-details-attribute-box">{user?.phone}</div>
                </div>
                <div className="account-pane-details-attribute">
                    <div className="account-pane-details-attribute-label">{props.t("account.details.zip_code")}</div>
                    <div className="account-pane-details-attribute-box">{user?.zip_code}</div>
                </div>
                <div className="account-pane-details-attribute">
                    <div className="account-pane-details-attribute-label">{props.t("account.details.country")}</div>
                    <div className="account-pane-details-attribute-box">{user?.country}</div>
                </div>
                <div className="account-pane-details-attribute">
                    <div className="account-pane-details-attribute-label">{props.t("account.details.city")}</div>
                    <div className="account-pane-details-attribute-box">{user?.city}</div>
                </div>
                <div className="account-pane-details-attribute">
                    <div className="account-pane-details-attribute-label">{props.t("account.details.address")}</div>
                    <div className="account-pane-details-attribute-box">{user?.address}</div>
                </div>
            </div>
        </div>
    </div>
}

AccountPaneDetails.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(AccountPaneDetails);
