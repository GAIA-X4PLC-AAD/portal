import React from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DashboardView from "./dashboard_view";
import SideSectionsView from "./side_sections_view";


const DashboardPage = () => {

    const type = 'dashboard';
    const _leftPanelWidth = '225px'


    const colItemView = ({ title, caption, subtitle, }) => {
        return <Column>
            <Row justifyContent='space-between' alignItems='center'>
                <BodySmallBoldText>{title}</BodySmallBoldText>
                <CaptionText>{caption}</CaptionText>
            </Row>
            <CaptionText>{subtitle}</CaptionText>
        </Column>
    }


    const sideBarView = () => {

        const _welcomeView = <>
            <Row justifyContent='space-between' alignItems='center' data-tag='welcom-view'>
                <Circle radius='50px'>JD</Circle>
                <Padding horizontal='8px'>
                    {colItemView({
                        title: 'Welcome to Gaia-x, Jane Doe',
                        subtitle: 'Registered as part of <Company GmbH>',
                    })}
                </Padding>
            </Row>
        </>

        const _cardView = <Padding vertical='24px'>
            <Card>
                <Padding vertical='16px' horizontal='24px'>{colItemView({ title: '2pm', subtitle: 'Tuesday, 9th March 2021', caption: '' })}</Padding>
            </Card>
        </Padding>

        return <>
            {_welcomeView}
            {_cardView}
            <SideSectionsView/>
        </>
    }

    return <Row>

        {/* SIDE BAR */}
        <Style maxWidth={_leftPanelWidth}>
            {sideBarView()}
        </Style>

        {/* BODY VIEW */}
        <Padding horizontal='12px' />
        <Style minWidth='900px'>
            <DashboardView type={type} />
        </Style>
    </Row>;

}

DashboardPage.propTypes = {
    type: PropTypes.string
}

export default DashboardPage;