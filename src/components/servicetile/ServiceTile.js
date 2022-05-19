import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./ServiceTile.css";
import { useTranslation } from 'react-i18next';


import PropTypes from 'prop-types';

import DescriptionTabView from "../tabs/Description/DescriptionTabView";
import ExpandableView from "../expandable/ExpandableView";
import LoadingView from "../loading_view/LoadingView";
import ScreenshotsTabView from "../tabs/Screenshots/ScreenshotsTabView";

const ServiceTile = () => {
    const { serviceId } = useParams();
    const [queryParams, ] = useSearchParams();
    const view = queryParams.get("view");
    const [showDetails, setShowDetails] = useState(true);

    const { t, } = useTranslation();


    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
        "services": {
            "type": "basic-service/composite-service",
            "logo": "URL to image of PPR logo",
            "name": "Service name",
            "id": "service id",
            "ppr_name": "Provider name",
            "ppr_url": "URL to PPR",
            "stack": "String",
            "security": "String",
            "location": "String"
        }
    }

    const styleTabActive = (key) => {
        if (view === key) {
            return "service-tile_active_tab";
        }
        return ""
    }

    const styleDivHidden = (bool) => {
        if (bool) {
            return "div_hidden";
        }
        return ""
    }

    const DescriptionTab = ({ serviceId }) => {
        return (
            <LoadingView
                url={`https://reqres.in/api/users/${serviceId}?delay=1`}
                successView={DescriptionTabView}
            />
        )
    }

    const ScreenshotsTab = ({ serviceId }) => {
        return (
            <LoadingView
                url={`https://reqres.in/api/users/${serviceId}?delay=1`}
                successView={ScreenshotsTabView}
            />
        )
    }

    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 1 })} title='Details' />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 2 })} title='Price' />
                <ExpandableView initiallyExpanded={true} view={ScreenshotsTab({ serviceId: 3 })} title='Screenshots' />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 3 })} title='Contact' />
            </>
        )
    }

    const addTab = (linkName, view) => {
        return (
            <h4 className={"service-tile_nav_item " + `${styleTabActive(view)}`}>
                <Link to={`/servicetile/${serviceId}?view=${view}`}>{linkName}</Link>
            </h4>
        );
    }

    return (
        <div className="service-tile">
            <div className="service-tile_header">
                <a href={"#" || input.services.ppr_url}>
                    <img src={input.services.logo} alt="Provider Logo"></img>
                </a>
                <div>
                    <div className="service-tile_header_st_row">{input.services.name}</div>
                    <div className="service-tile_header_nd_row">{input.services.ppr_name}</div>
                </div>
                <div>
                    <div className="service-tile_header_st_row">{t("service-tile.header.stack")}</div>
                    <div className="service-tile_header_nd_row">{input.services.stack}</div>
                </div>
                <div>
                    <div className="service-tile_header_st_row">{t("service-tile.header.security")}</div>
                    <div className="service-tile_header_nd_row">{input.services.security}</div>
                </div>
                <div>
                    <div className="service-tile_header_st_row">{t("service-tile.header.location")}</div>
                    <div className="service-tile_header_nd_row">{input.services.location}</div>
                </div>
                <div className="service-tile_header_details" onClick={() => setShowDetails(!showDetails)}>
                    {t("service-tile.details")}
                </div>
            </div>
            <div className={`${styleDivHidden(showDetails)}`}>
                <div className="service-tile_content">
                    <div className="service-tile_body">
                        {showComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

ServiceTile.propTypes = {
    serviceId: PropTypes.int,
    t: PropTypes.func,
}

export default ServiceTile;