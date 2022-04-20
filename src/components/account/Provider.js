import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./ProviderAccount.css"
import ProviderDetails from "./ProviderDetails";

const Provider = (props) => {
    const {tab} = useParams();

    const showDetailsSelected = (key) => {
        if (tab === key)
        return (
            <hr className="provider-account-details_tab_hr"/>
        );
    }
    const showComponent = () => {
        console.log(props);
        console.log(tab);
        switch (tab) {
            case "details": 
                return (<ProviderDetails/>);
            case "credentials": 
                return null;
            case "history":
                return null;
            default:
                return (<ProviderDetails/>);
        }
    }

    return (
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
                    <Link to="/account/provider/details/">
                        {props.t("account.detailsTab")}
                    </Link>
                    {showDetailsSelected("details")}
                    </h4>
                    <div className="provider-account-details_tab-spacer"></div>

                    <h4 className="provider-account-section1__highlights5 layout">
                            <Link to="/account/provider/history/">
                                {props.t("account.logHistoryTab")}
                            </Link>
                            {showDetailsSelected("history")}
                    </h4>

                    <div className="provider-account-details_tab-spacer"></div>
                    <h4 className="provider-account-section1__highlights5 layout">
                    <Link to="/account/provider/credentials/">
                        {props.t("account.credentialsTab")}
                    </Link>
                        {showDetailsSelected("credentials")}
                    </h4>
                </div>
                <hr className="provider-account-section1__line2 layout" />
                {showComponent()}
        </div>
    );
}

export default withTranslation () (Provider);