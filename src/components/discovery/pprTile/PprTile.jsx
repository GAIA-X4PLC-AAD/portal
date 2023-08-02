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
import { Column, Image, Padding, Row, Style } from "../../../common/styles";

const PprTile = ({ id, input, t }) => {
    const type = "ppr";


    const padTitle = ({ _titleView }) => {
        return <Padding paddingTop='18px' paddingBottom='8px'>
            {_titleView}
        </Padding>
    }
    const showComponent = () => {
        let _width = "100%"
        return <>
            <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id, type: type })}
                title={<>{padTitle({ _titleView: <>{t("service-tile.details")}</> })}</>}    // converting string to a React element to remove console warning
                titleTrailerPadding="12px" viewLeadingPadding="24px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                shiftedBottomBorder={true}
                borderBottom={false}
            />
            <ExpandableView initiallyExpanded={false} view={ServicesTab({ id })}
                title={<>{padTitle({ _titleView: <>{t("service-tile.services")}</> })}</>}
                titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                shiftedBottomBorder={true}
                borderBottom={false}
            />
            <ExpandableView initiallyExpanded={false} view={DataSetTab({ id })}
                title={<>{padTitle({ _titleView: <>{t("service-tile.datasets")}</> })}</>}
                titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3"
                width={_width}
                shiftedBottomBorder={true}
                borderBottom={false}
            />
            <ExpandableView initiallyExpanded={false} view={ContactTab({ id, type: type })}
                title={<>{padTitle({ _titleView: <>{t("service-tile.contact")}</> })}</>}
                titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" 
                width={_width}
                shiftedBottomBorder={false} borderBottom={false}
            />
        </>
    }
    const showTileHeader = () => {
        return (
            <S.DiscoveryTile>
                <Row alignItems='Center' justifyContent='start'>
                    <Padding horizontal='28px' vertical='24px'><CheckBox type="checkbox" /></Padding>
                    {/* LOGO */}
                    <a href={"#" || input.services.ppr_url}>
                        {/* <Image */}
                        <Image src={input.logo} alt='Provider Logo' width='48px' height='48px' />
                    </a>
                    <Padding paddingLeft='62px' />
                    <Row alignItems='Center' justifyContent='space-between'>
                        {/* NAME */}
                        <S.DiscoveryTileFirstRow width={'140px'}>{input.name}</S.DiscoveryTileFirstRow>
                        {/* SUSTAINABILITY */}
                        <Padding paddingLeft='60px' />
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.sustainability")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.sustainability}</S.DiscoveryTileSecondRow>
                        </Column>
                        <Padding paddingLeft='20px' />
                        {/* AVAILABILITY */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.availability")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.availability}</S.DiscoveryTileSecondRow>
                        </Column>
                        <Padding paddingLeft='20px' />
                        {/* LOCATION */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.location}</S.DiscoveryTileSecondRow>
                        </Column>
                    </Row>

                    {/* DETAILS */}
                    <Style flexGrow='1'>

                    </Style>

                    <S.DiscoveryDetailsButton>
                        {t("service-tile.details")}
                    </S.DiscoveryDetailsButton>
                    <Padding paddingLeft='20px' />
                </Row>

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


export default withTranslation()(PprTile);