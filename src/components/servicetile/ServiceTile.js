import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./ServiceTile.css";
import ServiceTileDetails from "./ServiceTileDetails";
import ServiceTilePrice from "./ServiceTilePrice";
import ServiceTileScreenshots from "./ServiceTileScreenshots";
import ServiceTileContact from "./ServiceTileContact";

const ServiceTile = (props) => {
    const {serviceId} = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");

    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
        "services":{
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

    const showComponent = () => {
        switch (view) {
            case "Details":
                return (<ServiceTileDetails serviceId={serviceId} />);
            case "Price":
                return (<ServiceTilePrice serviceId={serviceId} />);
            case "Screenshots":
                return (<ServiceTileScreenshots serviceId={serviceId} />);
            case "Contact":
                return (<ServiceTileContact serviceId={serviceId} />);
            default:
                return null;
        }
    }

    const addTab = (linkName, view) => {
        return (
            <h4 className={"service-tile_nav_item " + `${styleTabActive(view)}`}>
                <Link to={`/servicetile/${serviceId}?view=${view}`}>{linkName}</Link>
            </h4>
    );}

    return (
        <div className="service-tile">
            <div className="service-tile_header">
                <a href={input.services.ppr_url}>
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
                <div className="service-tile_header_details">
                {props.t("service-tile.details")}
                </div>
            </div>
            <div className="service-tile_nav">
                {addTab(props.t("service-tile.details"), "Details")}
                {addTab(props.t("service-tile.price"), "Price")}
                {addTab(props.t("service-tile.screenshots"), "Screenshots")}
                {addTab(props.t("service-tile.contact"), "Contact")}
            </div>
            <div className="service-tile_body">
                {showComponent("Details")}
            </div>
        </div>
    );
}

export default withTranslation () (ServiceTile);