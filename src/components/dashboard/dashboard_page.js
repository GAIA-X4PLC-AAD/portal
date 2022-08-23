import React from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle, CaptionTextLink } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DashboardView from "./dashboard_view";
import SideSectionsView from "./side_sections_view";
import { useSelector } from "react-redux";
import DateTimeCard from "./date_time_card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



const DashboardPage = () => {
    const { t } = useTranslation();

    const user = useSelector((state) => state.user)
    const role = user.user.user_role
    const type = 'dashboard';
    const _leftPanelWidth = '225px'
    const navigate = useNavigate();



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
        const organization =  <CaptionTextLink onClick={() => { navigate('/account/provider/details') }}>{user.user.organization_name}</CaptionTextLink>

        const _welcomeView = <>
            <Row justifyContent='space-between' alignItems='center' data-tag='welcom-view'>
                <Circle radius='50px'>{user.user.first_name[0] + user.user.family_name[0]}</Circle>
                <Padding horizontal='8px'>
                    {role === 'gaiax-pcr' ?
                        colItemView({
                            title: t("dashboard.welcome", {username: `${user.user.first_name} ${user.user.family_name}`}) 
                        })
                        : colItemView({
                            title: t("dashboard.welcome", {username: `${user.user.first_name} ${user.user.family_name}`}),
                            subtitle: t("dashboard.organization_subtitle", {organization})
                        })}
                </Padding>
            </Row>
        </>

        return <>
            {_welcomeView}
            <DateTimeCard />
            <SideSectionsView />
        </>
    }

    return <Row>

        {/* SIDE BAR */}
        <Style minWidth={_leftPanelWidth}>
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