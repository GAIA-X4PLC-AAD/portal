import React from "react";
import { withTranslation } from "react-i18next";
import "../servicetile/ServiceTile.css";
import * as S from '../style';
import PropTypes from 'prop-types';
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import DescriptionTab from "../tabs/description/DescriptionTab";
import ServicesTab from "../tabs/servicesTab/ServicesTab";
import DataSetTab from "../tabs/dataSetsTab/DataSetTab";

const PprTile = ({id, input, t}) => {
    const type = "ppr";


    const showComponent = () => {
        return (
            <>


                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id,  type: type })} title={t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={ServicesTab({ id })} title={t("service-tile.services")} />
                <ExpandableView initiallyExpanded={false} view={DataSetTab({ id })} title={t("service-tile.datasets")} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id, type: type })} title={t("service-tile.contact")} />
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
                    <S.DiscoveryTileFirstRow>{t("service-tile.header.sustainability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.sustainability}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{t("service-tile.header.availability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.availability}</S.DiscoveryTileSecondRow>
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
        <ExpandableView initiallyExpanded={true} view={showTileContent()} title={showTileHeader()} />
    );


}

PprTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}


export default withTranslation () (PprTile);