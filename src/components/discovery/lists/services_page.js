
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

import { Row } from "../../../common/styles";
import SearchView from "../search/SearchView";
import { Padding } from "../tabs/style";
import SearchContent from "../search/SearchContent";

const ServicesPage = () => {

    return (
        <>
            <Row>
                <SearchView type="services" />
                <Padding horizontal='12px'/>
                <SearchContent type="services"/>
            </Row>
        </>

    );

};

ServicesPage.propTypes = {

}

export default ServicesPage;