import React from "react";
import { withTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import * as S from '../style';
import PropTypes from 'prop-types';
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";

import DescriptionTab from "../tabs/description/DescriptionTab";
import ScreenshotsTab from "../tabs/screenshots/ScreenshotsTab";

const ServiceTile = (props) => {
    const { serviceId } = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const type = "services";

    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
        "services": {
            "type": "basic-service/composite-service",
            "logo": "/images/logo-placeholder.svg",
            "name": "Service name",
            "id": "service id",
            "ppr_name": "Provider name",
            "ppr_url": "URL to PPR",
            "stack": "String",
            "security": "String",
            "location": "String"
        }
    }

    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ serviceId: serviceId })} title={props.t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id: serviceId , type: type})} title={props.t("service-tile.price")} />
                <ExpandableView initiallyExpanded={false} view={ScreenshotsTab({ serviceId: serviceId })} title={props.t("service-tile.screenshots")} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: serviceId, type: type })} title={props.t("service-tile.contact")} />
            </>
        )
    }


    const showTileHeader = () => {


        return (
            <S.DiscoveryTile>
                <S.DiscoveryTileHeader>
                    <a href={"#" || input.services.ppr_url}>
                        <img src={input.services.logo} alt="Provider Logo" width={48}></img>
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
            <S.DiscoveryDetailsBody>
                {showComponent()}
            </S.DiscoveryDetailsBody>
        </S.DiscoveryDetailsContent>

        );
    }

    return (
        <ExpandableView initiallyExpanded={true} view={showTileContent()} title={showTileHeader()} />
    );

}

ServiceTile.propTypes = {
    serviceId: PropTypes.func,
    t: PropTypes.func,
}

export default withTranslation()(ServiceTile);