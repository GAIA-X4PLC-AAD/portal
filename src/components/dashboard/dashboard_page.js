import React, { useEffect } from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DashboardView from "./dashboard_view";
import { Block } from "../expandable/style";
import LoadingView from "../loading_view/LoadingView";
import SideSectionsView from "./side_sections_view";


const DashboardPage = () => {

    const _data = { "type": "dashboard", "categories": [{ "name": "My Transactions", "items": [{ "name": "Transaction 1", "qty": 107 }, { "name": "Transaction 2", "qty": 198 }, { "name": "Transaction 3", "qty": 103 }, { "name": "Transaction 4", "qty": 93 }, { "name": "Transaction 5", "qty": 99 }, { "name": "Transaction 6", "qty": 0 }] }, { "name": "News", "items": [{ "name": "News 1", "qty": 100 }, { "name": "News 2", "qty": 200 }, { "name": "News 3", "qty": 300 }] }] }

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
        <Style maxWidth='900px'>
            <DashboardView type={type} />
        </Style>
    </Row>;

}

DashboardPage.propTypes = {
    type: PropTypes.string
}

export default DashboardPage;