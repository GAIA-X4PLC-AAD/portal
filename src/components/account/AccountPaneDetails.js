import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import "./../Register.css";

const AccountPaneDetails = ({details, t}) => {



    const renderAccountPaneDetails = () => {
        return (
            <div className="account-pane-details">
                <ul>
                    <li>
                        Email Address: {details.email}
                    </li>
                    <li>
                        First Name: {details.firstName}
                    </li>
                    <li>
                        Last Name: {details.lastName}
                    </li>
                </ul>
            </div>
        )
    };

    return (
        renderAccountPaneDetails()
    );
}

export default withTranslation()(AccountPaneDetails);
