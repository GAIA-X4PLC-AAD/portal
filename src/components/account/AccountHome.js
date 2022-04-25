import React, {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import axios from "axios";
import "./../Register.css";
import configData from "../../config/config.json";
import AccountPaneDetails from "./AccountPaneDetails";
import AccountPaneLoginHistory from "./AccountPaneLoginHistory";

const AccountHome = (props) => {
    const tabsAvailable = {
        "Details": { render: <AccountPaneDetails details={{}} />},
        "Login History": { render: <AccountPaneLoginHistory details={[]} />}
    }
    const mockCodedAccountDetails = { // TODO: remove mockCoded
        "email": "LordBlackadder@Cunning.co",
        "firstName": "Lord",
        "lastName": "Blackadder"
    }
    const mockCodedLoginHistory = [ // TODO: remove mockCoded
        { date: "A", time: "B"},
        { date: "AB", time: "ABC"}
    ]

    const [activeTab, setActiveTab] = useState("Details")
    const [tabs, setTabs] = useState(tabsAvailable)

    useEffect(() => {
        const initValue = { // TODO: replace with getAccountDetails and getLoginHistory
            "Details": { render: <AccountPaneDetails details={mockCodedAccountDetails} />},
            "Login History": { render: <AccountPaneLoginHistory details={mockCodedLoginHistory} />}
        }
        setTabs(tabs => ({...tabs, ...initValue}))
    }, []);

    const getAccountDetails = () => {// Extend with parameter user from from session
        return mockCodedAccountDetails
        axios.get(configData.WIREMOCK_API_URI + '/auth/identity/mock_did').
            then(
                (response) => {
                    return response
            },(error)=> {
                console.log(`Error with status ${error.response.status} and message:\n ${error.response.data}`);
        });
    }

    const onTabClick = (label) => { setActiveTab(label) }

    const renderTabMenu = () => {
        return (<div className="tab-menu">{renderTabMenuButtons()}</div>)
    }

    const renderTabMenuButtons = () => { return Object.entries(tabs).map(([k, v]) => {
        if (k == activeTab) {
            return <div className="tab-menu-active" key={ "tab-menu-" + k}>{k}</div>
        } else { 
            return <div onClick={() => onTabClick(k)} key={ "tab-menu-" + k}>{k}</div> }
    })}

    const renderTabPane = () => { return (tabs[activeTab].render)}

    const renderAccountHome = () => {
        return (
            <div className="AccountHome">
                {renderTabMenu()}
                {renderTabPane()}
            </div>
        )
    };

    return (renderAccountHome());
}

export default withTranslation()(AccountHome);
