import React, { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as S from '../style';
import PropTypes from 'prop-types';
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";

import DescriptionTab from "../tabs/description/DescriptionTab";
import ScreenshotsTab from "../tabs/screenshots/ScreenshotsTab";

const ServiceTile = ({input, id, t}) => {
    const type = "services";


    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id:id, type: type })} title={t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id:id, type: type})} title={t("service-tile.price")} />
                <ExpandableView initiallyExpanded={false} view={ScreenshotsTab({ serviceId: id })} title={t("service-tile.screenshots")} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id:id, type: type })} title={t("service-tile.contact")} />
            </>
        )
    }


    const showTileHeader = () => {


        return (
            <S.DiscoveryTile>
                <S.DiscoveryTileHeader>
                    <a href={"#" || input.services.ppr_url}>
                        <img src={input.logo} alt="Provider Logo" width={48}></img>
                    </a>
                    <div>
                        <S.DiscoveryTileFirstRow>{input.name}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.ppr_name}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.stack")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.stack}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.security")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.security}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.location}</S.DiscoveryTileSecondRow>
                    </div>
                    <S.DiscoveryDetailsButton>
                        {t("service-tile.details")}
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
        <ExpandableView initiallyExpanded={false} view={showTileContent()} title={showTileHeader()} border={true} />
    );

}

ServiceTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
   t: PropTypes.func,
}

export default withTranslation()(ServiceTile);