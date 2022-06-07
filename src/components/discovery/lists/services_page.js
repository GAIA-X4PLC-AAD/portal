
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import PageListView from "./page_list_view";
import * as S from './style';
import { Row } from "../../../common/styles";
import SearchView from "../search/SearchView";
import { Padding } from "../tabs/style";
import SearchContent from "../search/SearchContent";

const ServicesPage = ({ pageNumber }) => {

    return (
        <>
            <Row>
                <SearchView type="services" />
                <Padding horizontal='12px'/>
                <SearchContent type="services"/>
                {/* <PageListView
                    type={'services'}
                    pageNumber={1} /> */}
            </Row>
        </>

    );

};

ServicesPage.propTypes = {
    pageNumber: PropTypes.number,
}

export default ServicesPage;