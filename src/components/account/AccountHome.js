import React from 'react'
import { Link, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import "./Account.css";
import AccountPaneDetails from "./AccountPaneDetails.js";
import AccountPaneLoginHistory from "./AccountPaneLoginHistory.js";

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
                        {props.t("account.myAccount")}
                    </div>
                    <h4 className="provider-account-section1__highlights4 layout">
                        {props.t("account.myAccountDescription")}
                    </h4>
                </div>
                <div className="provider-account-details_tab layout">
                    <h4 className="provider-account-section1__highlights5 layout">
                        <Link to="/account/user/details/">
                            {props.t("account.detailsTab")}
                        </Link>
                        {showDetailsSelected("details")}
                    </h4>
                    <h4 className="provider-account-section1__highlights5 layout">
                        <Link to="/account/user/history/">
                            {props.t("account.logHistoryTab")}
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
AccountHome.propTypes = {
    t: PropTypes.func
}

export default withTranslation()(AccountHome);