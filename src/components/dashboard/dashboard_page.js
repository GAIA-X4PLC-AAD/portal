import React, { useEffect } from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DashboardView from "./dashboard_view";
import { Block } from "../expandable/style";


const DashboardPage = () => {

    const _data = { "type": "dashboard", "categories": [{ "name": "My Transactions", "items": [{ "name": "Transaction 1", "qty": 107 }, { "name": "Transaction 2", "qty": 198 }, { "name": "Transaction 3", "qty": 103 }, { "name": "Transaction 4", "qty": 93 }, { "name": "Transaction 5", "qty": 99 }, { "name": "Transaction 6", "qty": 0 }] }, { "name": "News", "items": [{ "name": "News 1", "qty": 100 }, { "name": "News 2", "qty": 200 }, { "name": "News 3", "qty": 300 }] }] }

    const type = 'dashboard';
    const _leftPanelWidth = '225px'

    const buildCategoryView = ({ category }) => {

        const colItem = ({ title, subtitle }) => {
            return <Padding vertical='8px' horizontal='8px'>
                <Column>
                    <Row justifyContent='space-between'>
                        <BodySmallBoldText>{title}</BodySmallBoldText>
                        <CaptionText>12.02</CaptionText>
                    </Row>
                    <CaptionText>{subtitle}</CaptionText>
                </Column>
            </Padding>
        }

        const categoryItems = category['items'].map((element, _index) => {
            return <Style key={`${element['name']}${_index}`}>{colItem({ title: element['name'], subtitle: 'Subline' })}</Style>;
        })

        return <>
            <BodySmallBoldText>{category['name']}</BodySmallBoldText>
            <Block border={true} borderBottom={true} width={_leftPanelWidth}>
                {
                    <Padding vertical='8px' horizontal='8px'>{categoryItems}</Padding>
                }
            </Block>
        </>;
    }


    const sideBar = () => {

        const _views = _data['categories'].map((category, index) => {
            return <Padding key={`${category['name']}${index}`}>{buildCategoryView({ category: category })}</Padding>
        })

        return _views
    }

    return <Row>
        <Style maxWidth={_leftPanelWidth}>
            {sideBar()}
        </Style>

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