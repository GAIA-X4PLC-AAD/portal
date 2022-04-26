import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import "./../Register.css";

const AccountPaneLoginHistory = () => {
    const renderAccountPaneLoginHistory = () => {
        return (
            <div className="account-pane-loginhistory">
                history
            </div>
        )
    };

    return (
        renderAccountPaneLoginHistory()
    );
}

export default withTranslation()(AccountPaneLoginHistory);
