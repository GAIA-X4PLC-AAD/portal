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
import { CheckBox } from "../search/style";
import { Column, Image, Padding, Row, Style } from "../../../common/styles";

const DataTile = ({ input, id, t }) => {

    const type = "data";

    const padTitle = ({ _titleView }) => {
        return <Padding paddingTop='18px' paddingBottom='8px'>
            {_titleView}
        </Padding>
    }

    const showComponent = () => {
        let _width = "100%"
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ id, type: type })}
                    title={<>{padTitle({ _titleView: <>{t("service-tile.details")}</> })}</>}
                    titleTrailerPadding="12px" viewLeadingPadding="24px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                    shiftedBottomBorder={true}
                    borderBottom={false} />
                <ExpandableView hidden={true} initiallyExpanded={false}
                    view={PriceTab({ id, type: type })}
                    title={<>{padTitle({ _titleView: <>{t("service-tile.price")}</> })}</>}
                    titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                    shiftedBottomBorder={true} borderBottom={false} />
                <ExpandableView initiallyExpanded={false} view={SampleRecordTab({ id })}
                    title={<>{padTitle({ _titleView: <>{t("service-tile.sample")}</> })}</>}
                    titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                    shiftedBottomBorder={true} borderBottom={false} />
                <ExpandableView initiallyExpanded={false}
                    view={ContactTab({ id, type: type })}
                    title={<>{padTitle({ _titleView: <>{t("service-tile.contact")}</> })}</>}
                    titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width}
                    shiftedBottomBorder={false} borderBottom={false}/>
            </>
        )
    }

    const showTileHeader = () => {
        return (
            <S.DiscoveryTile>
                <Row alignItems='Center' justifyContent='start'>
                    <Padding horizontal='28px' vertical='24px'><CheckBox type="checkbox" /></Padding>
                    {/* LOGO */}
                    <a href={"#"}>
                        <Image src='/images/logo-placeholder.png' alt='Provider Logo' width='48px' height='48px' />
                    </a>
                    <Padding paddingLeft='62px' />

                    <Row alignItems='Center' justifyContent='space-between'>
                        {/* NAME */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'152px'}>ID</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.id}</S.DiscoveryTileSecondRow>
                        </Column>
                        {/* Title */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'152px'}>Title</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.title}</S.DiscoveryTileSecondRow>
                        </Column>
                        {/* SHORT DESCRIPTION */}
                        <Padding paddingLeft='60px' />
                        <Column>
                            <S.DiscoveryTileFirstRow width={'80px'}>{t("service-tile.header.sortDescription")}</S.DiscoveryTileFirstRow>
                            <S.DiscoveryTileSecondRow>{input.description}</S.DiscoveryTileSecondRow>
                        </Column>
                        <Padding paddingLeft='80px' />
                        {/* LOCATION */}
                        <Column>
                            <S.DiscoveryTileFirstRow width={'120px'}>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
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

DataTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation()(DataTile);
