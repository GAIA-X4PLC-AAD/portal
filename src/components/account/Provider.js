import React from "react";
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
                    My Account
                    </div>
                        <h4 className="provider-account-section1__highlights4 layout">
                            Here you can manage all your information
                        </h4>
                </div>
                <div className="provider-account-details_tab layout">
                    <h4 className="provider-account-section1__highlights5 layout">
                    <Link to="/account/provider/details/">
                        Details
                    </Link>
                    {showDetailsSelected("details")}
                    </h4>
                    <div className="provider-account-details_tab-spacer"></div>

                    <h4 className="provider-account-section1__highlights5 layout">
                            <Link to="/account/provider/history/">
                                Login History
                            </Link>
                            {showDetailsSelected("history")}
                    </h4>

                    <div className="provider-account-details_tab-spacer"></div>
                    <h4 className="provider-account-section1__highlights5 layout">
                    <Link to="/account/provider/credentials/">
                        Credentials
                    </Link>
                        {showDetailsSelected("credentials")}
                    </h4>
                </div>
                <hr className="provider-account-section1__line2 layout" />
                {showComponent()}
        </div>
    );
}

export default Provider;