import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./ServiceTile.css";
import ServiceTilePrice from "./ServiceTilePrice";
import ServiceTileScreenshots from "./ServiceTileScreenshots";
import ServiceTileContact from "./ServiceTileContact";

import PropTypes from 'prop-types';
import LoadingView from "../loading_view/LoadingView";
import DescriptionTabView from "../tabs/DescriptionTabView";
import ExpandableView from "../expandable/ExpandableView";

const ServiceTile = (props) => {
    const { serviceId } = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const [showDetails, setShowDetails] = useState(true);

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

    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ serviceId: 1 })} title='Details' />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 2 })} title='Price' />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 3 })} title='Screenshot' />
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
                    <div className="service-tile_header_st_row">{props.t("service-tile.header.stack")}</div>
                    <div className="service-tile_header_nd_row">{input.services.stack}</div>
                </div>
                <div>
                    <div className="service-tile_header_st_row">{props.t("service-tile.header.security")}</div>
                    <div className="service-tile_header_nd_row">{input.services.security}</div>
                </div>
                <div>
                    <div className="service-tile_header_st_row">{props.t("service-tile.header.location")}</div>
                    <div className="service-tile_header_nd_row">{input.services.location}</div>
                </div>
                <div className="service-tile_header_details" onClick={() => setShowDetails(!showDetails)}>
                    {props.t("service-tile.details")}
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

export default withTranslation()(ServiceTile);