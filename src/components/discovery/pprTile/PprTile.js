import React from "react";
import { withTranslation } from "react-i18next";
import {  useParams, useSearchParams } from "react-router-dom";
import "../servicetile/ServiceTile.css";
import * as S from '../style';
import PropTypes from 'prop-types';
import LoadingView from "../../loading_view/LoadingView";
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import DescriptionTab from "../tabs/description/DescriptionTab";
import ServicesTab from "../tabs/servicesTab/ServicesTab";
import DataSetTab from "../tabs/dataSetsTab/DataSetTab";

const PprTile = (props) => {
    const {pprId} = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const type = "ppr";

    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
            "type": "ppr",
            "logo": "/images/logo-placeholder.svg",
            "ppr_url": "URL to PPR",
            "name": "PPR name",
            "id": "PPR id",
            "sustainability": "String",
            "availability": "String",
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


                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id: pprId, type: type })} title={props.t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={ServicesTab({ id: pprId })} title={props.t("service-tile.services")} />
                <ExpandableView initiallyExpanded={false} view={DataSetTab({ id: pprId })} title={props.t("service-tile.datasets")} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: pprId, type: type })} title={props.t("service-tile.contact")} />
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
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.sustainability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.sustainability}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.availability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.availability}</S.DiscoveryTileSecondRow>
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

PprTile.propTypes = {
    pprId: PropTypes.func,
    t: PropTypes.func
}


export default withTranslation () (PprTile);