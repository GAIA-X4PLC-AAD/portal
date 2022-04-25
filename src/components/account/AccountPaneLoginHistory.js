import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import "./../Register.css";

const AccountPaneLoginHistory = ({details, t}) => {

    const renderLoginEntry = (details) => { return details.map(
        (item, index) => { return (
            <div key={index}>Date: {item.date} , Time: {item.time}</div>
        )
    })}


    const renderAccountPaneLoginHistory = () => {
        return (
            <div className="account-pane-loginhistory">
                {renderLoginEntry(details)}
            </div>
        )
    };

    return (
        renderAccountPaneLoginHistory()
    );
}

export default withTranslation()(AccountPaneLoginHistory);
