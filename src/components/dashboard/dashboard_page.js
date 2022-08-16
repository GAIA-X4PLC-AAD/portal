import React from "react";
import PropTypes from 'prop-types';


import { BodySmallBoldText, Column, Row, Style, CaptionText, Card, Circle, CaptionTextLink } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import DashboardView from "./dashboard_view";
import SideSectionsView from "./side_sections_view";
import { useSelector } from "react-redux";
import DateTimeCard from "./date_time_card";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {

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

        const _welcomeView = <>
            <Row justifyContent='space-between' alignItems='center' data-tag='welcom-view'>
                <Circle radius='50px'>{user.user.first_name.substring(0,1) + user.user.family_name.substring(0,1)}</Circle>
                <Padding horizontal='8px'>
                    {role==='gaiax-pcr'?
                    colItemView({
                        title: `Welcome to Gaia-x, ${user.user.first_name} ${user.user.family_name}`
                    })
                    :colItemView({
                        title: `Welcome to Gaia-x, ${user.user.first_name} ${user.user.family_name}`,
                        subtitle: <CaptionText> 
                            {"Registered as part of "}
                            <CaptionTextLink onClick={()=>{navigate('/account/provider/details')}}>{user.user.organization_name}</CaptionTextLink>
                        </CaptionText>
                    })}
                </Padding>
            </Row>
        </>

        const _dateView = <Padding vertical='24px'>
            <Card>
                <Padding vertical='16px' horizontal='24px'>
                    {colItemView({ title: '2pm', subtitle: 'Tuesday, 9th March 2021', caption: '' })}
                </Padding>
            </Card>
        </Padding>

        return <>
            {_welcomeView}
            <DateTimeCard/>
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
    </Row> ;

}

DashboardPage.propTypes = {
    type: PropTypes.string
}

export default DashboardPage;