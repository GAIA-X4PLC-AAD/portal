import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./ProviderAccount.css"
import ProviderDetails from "./ProviderDetails";
import ProviderEdit from "./ProviderEdit";
import ProviderLoginHistory from "./ProviderLoginHistory";
import PropTypes from 'prop-types';

const Provider = (props) => {
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
                return (<ProviderDetails/>);
            case "credentials": 
                return null;
            case "history":
                return <ProviderLoginHistory/>;
            case "edit":
                return (<ProviderEdit/>);
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
                    {showDetailsSelected("edit")}
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

Provider.propTypes = {
    t: PropTypes.func,
}

export default withTranslation () (Provider);