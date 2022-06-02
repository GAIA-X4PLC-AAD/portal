
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import PageListView from "./page_list_view";
import * as S from './style';
import { Row } from "../../../common/styles";

const ServicesPage = ({ pageNumber }) => {

    return (
        <>
            <Row>
                <S.SideBar/>
                <PageListView
                    type={'services'}
                    pageNumber={1} />
            </Row>
        </>

    );

};

ServicesPage.propTypes = {
    pageNumber: PropTypes.number,
}

export default ServicesPage;