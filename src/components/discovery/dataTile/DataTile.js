import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LoadingView from "../../loading_view/LoadingView";
import ExpandableView from "../../expandable/ExpandableView";
import "../servicetile/ServiceTile.css";
import * as S from '../style';
import PropTypes from 'prop-types';

import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";
import DescriptionTab from "../tabs/description/DescriptionTab";

const DataTile = (props) => {
    const {dataId} = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const type = "data";
    
    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
            "type": "data",
            "logo": "/images/logo-placeholder.svg",
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

    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id: dataId, type: type })} title={props.t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id: dataId , type: type})} title={props.t("service-tile.price")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ id: dataId, type: type })} title={props.t("service-tile.sample")} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: dataId, type: type })} title={props.t("service-tile.contact")} />
            </>
        )
    }

    const showTileHeader = () => {
        return (
            <S.DiscoveryTile>
                <S.DiscoveryTileHeader>
                    <a href={"#" || input.ppr_url}>
                        <img src={input.logo} alt="Provider Logo" width={48}></img>
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
                    <S.DiscoveryDetailsButton>
                    {props.t("service-tile.details")}
                    </S.DiscoveryDetailsButton>
                </S.DiscoveryTileHeader>
            </S.DiscoveryTile>
        );
    }

    const showTileContent = () => {
        return (
            <S.DiscoveryDetailsContent>
            <S.DiscoveryTileContent>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryTileContent>
            </S.DiscoveryDetailsContent>
        );
    }

    return (
        <ExpandableView initiallyExpanded={true} view={showTileContent()} title={showTileHeader()} />
    );

}

DataTile.propTypes = {
    dataId: PropTypes.func,
    t: PropTypes.func,
}

export default withTranslation () (DataTile);