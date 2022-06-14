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
import { CheckBox } from "../search/style";

const PprTile = ({id, input, t}) => {
    const type = "ppr";


    const showComponent = () => {
        let _width = "100%"
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id,  type: type })} title={<>{t("service-tile.details")}</>} titleTrailerPadding="12px" viewLeadingPadding="24px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}/>
                <ExpandableView initiallyExpanded={false} view={ServicesTab({ id })} title={<>{t("service-tile.services")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}/>
                <ExpandableView initiallyExpanded={false} view={DataSetTab({ id })} title={<>{t("service-tile.datasets")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}/>
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id, type: type })} title={<>{t("service-tile.contact")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}/>
            </>
        )
    }
    const showTileHeader = () => {
        return (
        <S.DiscoveryTile>
            <S.DiscoveryTileHeader>
                <CheckBox type="checkbox" />
                <a href={"#" || input.ppr_url}>
                <img src={input.logo} alt="Provider Logo" width={48}></img>
                </a>
                <div>
                    <S.DiscoveryTileFirstRow width={'140px'}>{input.name}</S.DiscoveryTileFirstRow>
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

PprTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}


export default withTranslation () (PprTile);