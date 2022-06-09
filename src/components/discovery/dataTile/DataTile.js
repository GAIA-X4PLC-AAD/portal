import React from "react";
import { withTranslation } from "react-i18next";
import ExpandableView from "../../expandable/ExpandableView";
import "../servicetile/ServiceTile.css";
import * as S from '../style';
import PropTypes from 'prop-types';

import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";
import DescriptionTab from "../tabs/description/DescriptionTab";
import SampleRecordTab from "../tabs/SampleRecordTab/SampleRecordTab";

const DataTile = ({input,id,t}) => {
    
    const type = "data";
    
    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id, type: type })} title={t("service-tile.details")} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id , type: type})} title={t("service-tile.price")} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" />
                <ExpandableView initiallyExpanded={false} view={SampleRecordTab({ id })} title={t("service-tile.sample")} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id, type: type })} title={t("service-tile.contact")} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" />
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
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.sortDescription")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.short_description}</S.DiscoveryTileSecondRow>
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
            <S.DiscoveryTileContent>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryTileContent>
            </S.DiscoveryDetailsContent>
        );
    }

    return (
        <ExpandableView initiallyExpanded={false} view={showTileContent()} title={showTileHeader()} border={true} />
    );

}

DataTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation () (DataTile);