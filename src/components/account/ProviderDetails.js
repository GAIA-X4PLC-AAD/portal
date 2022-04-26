import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./ProviderAccount.css"

const ProviderDetails = (props) => {

    return (
                <div className="provider-account-details_info layout">
                    <div className="provider-account-details_info-item">
                        <div className="provider-account-section1__flex3 layout">
                            <div className="provider-account-section1__image14 layout">
                                Image goes here
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
                                            Email Address
                                        </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                     {props.t("account.details.companyName")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Company name
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                {props.t("account.details.comercialRegister")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Commercial register
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                     {props.t("account.details.registeredAddress")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                        <h5 className="provider-account-section1__highlights71 layout">

                                            Registered address
                                        </h5>
                                    </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.website")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Website
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                       {props.t("account.details.individualContact")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Individual contact
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
                                        Certifications
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.alias")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Alias
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.localAttestation")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Local Attestation
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.transparencyRegister")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Transparency register
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.dunsNumber")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        D-U-N-S Number
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.legalEntityIdentifier")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Legal Entoty Identifier
                                    </h5>
                                </div>
                            </div>
                            <div className="provider-account-section1__block layout">
                                <div className="provider-account-section1__small-text-body layout">
                                    {props.t("account.details.dataProviderOfficer")}
                                </div>
                                <div className="provider-account-section1__cover-block layout">
                                    <h5 className="provider-account-section1__highlights71 layout">
                                        Data Provider Officer
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default withTranslation() (ProviderDetails);