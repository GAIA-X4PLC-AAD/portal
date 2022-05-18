import React, { useState, createRef } from "react";
import { withTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import * as S from '../style';
import PropTypes from 'prop-types';
import LoadingView from "../../loading_view/LoadingView";
import DescriptionTabView from "../tabs/DescriptionTabView";
import ExpandableView from "../../expandable/ExpandableView";

const ServiceTile = (props) => {
    const { serviceId } = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const [showDetails, setShowDetails] = useState(true);
    const contentRef = createRef();


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
            contentRef.current.style.display = 'block';
        } 
        else {
            contentRef.current.style.display = 'none';
        }
        setShowDetails(!showDetails);
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
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ serviceId: 1 })} title={props.t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 1 })} title={props.t("service-tile.price")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 1 })} title={props.t("service-tile.screenshots")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ serviceId: 1 })} title={props.t("service-tile.contact")} />
            </>
        )
    }

    return (
        <S.DiscoveryTile>
            <S.DiscoveryTileHeader>
                <a href={"#" || input.services.ppr_url}>
                    <img src={input.services.logo} alt="Provider Logo"></img>
                </a>
                <div>
                    <S.DiscoveryTileFirstRow>{input.services.name}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.services.ppr_name}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.stack")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.services.stack}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.security")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.services.security}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.services.location}</S.DiscoveryTileSecondRow>
                </div>
                <S.DiscoveryDetailsButton onClick={() => styleDivHidden(showDetails)}>
                    {props.t("service-tile.details")}
                </S.DiscoveryDetailsButton>
            </S.DiscoveryTileHeader>
            <S.DiscoveryHiddenContent ref={contentRef}>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryHiddenContent>
        </S.DiscoveryTile>
    );
}

ServiceTile.propTypes = {
    serviceId: PropTypes.int,
    t: PropTypes.func,
}

export default withTranslation()(ServiceTile);