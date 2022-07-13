import React, { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as S from '../style';
import PropTypes from 'prop-types';
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";

import DescriptionTab from "../tabs/description/DescriptionTab";
import ScreenshotsTab from "../tabs/screenshots/ScreenshotsTab";
import { CheckBox } from "../search/style";
import { Column, Image, Padding, Row, Style } from "../../../common/styles";


const ServiceTile = ({ input, id, t }) => {
    const type = "services";

    const padTitle = ({ _titleView }) => {
        return <Padding paddingTop='18px' paddingBottom='8px'>
            {_titleView}
        </Padding>
    }

    const showComponent = () => {
        let _width = "100%"
        let _maxWidth = "850px"
        return (
            <>
                <ExpandableView
                    initiallyExpanded={true}
                    view={DescriptionTab({ id: id, type: type })}
                    title={<>{padTitle({ _titleView: <>{t("service-tile.details")}</> })}</>}    // converting string to a React element to remove console warning
                    titleTrailerPadding="12px"
                    viewLeadingPadding="40px"
                    titleLeadingPadding="40px"
                    arrowColor="#B3B3B3"
                    shiftedBottomBorder={true}
                    borderBottom={false}
                    width={_width} />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id: id, type: type })} title={<>{padTitle({ _titleView: <>{t("service-tile.price")}</> })}</>}  titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width} shiftedBottomBorder={true} borderBottom={false}/>
                <ExpandableView initiallyExpanded={false} view={ScreenshotsTab({ serviceId: id })} title={<>{padTitle({ _titleView: <>{t("service-tile.screenshots")}</> })}</>}  titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width} shiftedBottomBorder={true} borderBottom={false}/>
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: id, type: type })} title={<>{padTitle({ _titleView: <>{t("service-tile.contact")}</> })}</>}  titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width} maxWidth1='850px' shiftedBottomBorder={false} borderBottom={false}/>
            </>
        )
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
                        <Column>
                            <S.DiscoveryTileFirstRow width={'152px'}>{input.name}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.ppr_name}</S.DiscoveryTileSecondRow>
                        </Column>
                        {/* STACK */}
                        <Padding paddingLeft='60px' />
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.stack")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.stack}</S.DiscoveryTileSecondRow>
                        </Column>
                        <Padding paddingLeft='20px' />
                        {/* SECURITY */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.security")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.security}</S.DiscoveryTileSecondRow>
                        </Column>
                        <Padding paddingLeft='20px' />
                        {/* LOCATION */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'120px'}>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
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

ServiceTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation()(ServiceTile);