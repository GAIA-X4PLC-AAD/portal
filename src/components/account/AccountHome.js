import React, {useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import "./Account.css";
import AccountPaneDetails from "./AccountPaneDetails";
import AccountPaneLoginHistory from "./AccountPaneLoginHistory";

const AccountHome = (props) => {
    const {tab} = useParams();

    const showDetailsSelected = (key) => {
        if (tab === key)
        return (
            <hr className="provider-account-details_tab_hr"/>
        );
    }
    const showComponent = () => {
        switch (tab) {
            case "details":
                return (<AccountPaneDetails/>);
            case "history":
                return (<AccountPaneLoginHistory/>);
            default:
                return (<AccountPaneDetails/>);
        }
    }




    return (
            <div className="AccountHome">

            <div className="provider-account-details layout">
                <div className="provider-account-section1__cover-group layout">
                    <div className="provider-account-section1__image13">
                    My Account
                    </div>
                    <h4 className="provider-account-section1__highlights4 layout">
                        Here you can manage all your information
                    </h4>
                </div>
                <div className="provider-account-details_tab layout">
                    <h4 className="provider-account-section1__highlights5 layout">
                        <Link to="/account/details/">
                            Details
                        </Link>
                        {showDetailsSelected("details")}
                    </h4>
                    <h4 className="provider-account-section1__highlights5 layout">
                        <Link to="/account/history/">
                            Login History
                        </Link>
                        {showDetailsSelected("history")}
                    </h4>
                </div>
                <hr className="provider-account-section1__line2 layout" />
                {showComponent()}
            </div>
        </div>
        )

}

export default withTranslation()(AccountHome);