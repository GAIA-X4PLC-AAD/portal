import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProviderAccount.css";
import configData from "../../config/config.json";

const ProviderDetails = (props) => {

    const [provider, setProvider] = useState(null);
    
    useEffect (()=>{
        axios.get(configData.EDGE_API_URI + '/account/provider').then(   (response) => {
            setProvider(response.data);
    },(error)=> {
          alert('ko');
    });
    

    },[]);

    const showPersonalInformation = (person) => {
        return `${person?.name} ${person?.surname}`;
    }

    const showAddress = (address) => {
        return `${address?.street} ${address?.no} , (${address?.postalCode}) ${address?.city}  ${address?.country}  `;
    }

    return (
                <div className="provider-account-details_info layout">
                    <div className="provider-account-details_info-item">
                        <div className="provider-account-section1__flex3 layout">
                            <div className="provider-account-section1__image14 layout">
                                <img src={provider?.avatarImageLink} alt="User avatar image."/>
                            </div>
                            <div className="provider-account-section1__block7 layout">
                                <div className="provider-account-section1__block8 layout">
                                    <div className="provider-account-section1__text-body layout">
                                    <Link to="/account/provider/edit">
                                        {props.t("account.details.editAccount")}
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="provider-account-details_info-spacer"></div>
                    <div className="provider-account-details_info-item1">
                        <div className="provider-account-section1__flex4 layout">
                            <h2 className="provider-account-details-title1 layout">
                                {props.t("account.details.basicData")}
                            </h2>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.email")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                        <h5 className="provider-account-section1__highlights71 layout">
                                            {provider?.email}
                                        </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                     {props.t("account.details.companyName")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.companyName}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                {props.t("account.details.comercialRegister")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.comercialRegister}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                     {props.t("account.details.registeredAddress")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                        <h5 className="provider-account-section1__highlights71 layout">
                                            {showAddress(provider?.registeredAddress)}
                                        </h5>
                                    </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.website")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.webAddress}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                       {props.t("account.details.individualContact")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {showPersonalInformation(provider?.individualContact)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="provider-account-details_info-spacer1"></div>
                    <div className="provider-account-details_info-item2">
                        <div className="provider-account-section1__flex5 layout">
                            <h2 className="provider-account-details-title1 layout">
                                {props.t("account.details.details")}
                            </h2>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.certifications")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.certification}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.alias")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.alias}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.localAttestation")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                      {provider?.localAttestation}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.transparencyRegister")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.transparencyRegister}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.dunsNumber")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                    {provider?.dunsNumber}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.legalEntityIdentifier")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {provider?.legalEntityIdentifier}
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.dataProviderOfficer")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        {showPersonalInformation(provider?.dataProviderOfficer)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default withTranslation() (ProviderDetails);