import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "../../servicetile/ServiceTile.css";
import ServiceTileDetails from "../../servicetile/ServiceTileDetails";
import ServiceTileContact from "../../servicetile/ServiceTileContact";
import * as S from '../pprTile/style';

const DataTile = (props) => {
    const {dataId} = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const [showDetails, setShowDetails] = useState(true);
    const contentRef = React.createRef();

    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
            "type": "data",
            "logo": "URL to image of PPR logo",
            "ppr_url": "URL to PPR",
            "name": "data name",
            "ppr_name": "PPR name",
            "id": "data id",
            "short_description": "String",
            "location": "String"
    }

    const styleTabActive = (key) => {
        if (view === key) {
            return "service-tile_active_tab";
        }
        return ""
    }

    const styleDivHidden = (bool) => {
        if (bool) {
            contentRef.current.style.display = 'block';
        } 
        else {
            contentRef.current.style.display = 'none';
        }
        setShowDetails(!showDetails);
    }

    const showComponent = () => {
        switch (view) {
            case "Details":
                return (<ServiceTileDetails serviceId={dataId} />);
            case "Price":
                return null;
            case "Sample":
                return null;
            case "Contact":
                return (<ServiceTileContact serviceId={dataId} />);
            default:
                return null;
        }
    }

    const addTab = (linkName, view) => {
        return (
            <h4 className={"service-tile_nav_item " + `${styleTabActive(view)}`}>
                <Link to={`/datatile/${dataId}?view=${view}`}>{linkName}</Link>
            </h4>
    );}

    return (
        <S.DiscoveryTile>
            <S.DiscoveryTileHeader>
                <a href={"#" || input.ppr_url}>
                    <img src={input.logo} alt="Provider Logo"></img>
                </a>
                <div>
                    <S.DiscoveryTileFirstRow>{input.name}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.ppr_name}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.sustainability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.short_description}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.location}</S.DiscoveryTileSecondRow>
                </div>
                <S.DiscoveryDetailsButton onClick={() => styleDivHidden(showDetails)}>
                {props.t("service-tile.details")}
                </S.DiscoveryDetailsButton>
            </S.DiscoveryTileHeader>
            <S.DiscoveryHiddenContent ref={contentRef}>
            <S.DiscoveryTileContent>
                <S.DiscoveryDetailsNav>
                    {addTab(props.t("service-tile.details"), "Details")}
                    {addTab(props.t("service-tile.price"), "Price")}
                    {addTab(props.t("service-tile.sample"), "Sample")}
                    {addTab(props.t("service-tile.contact"), "Contact")}
                </S.DiscoveryDetailsNav>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryTileContent>
            </S.DiscoveryHiddenContent>
        </S.DiscoveryTile>
    );
}

export default withTranslation () (DataTile);