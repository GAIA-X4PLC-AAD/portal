import React from "react";
import { Column, Row } from "../../common/styles";
import SearchFilterFactory from "../discovery/search/SearchFilterFactory";
import AdminHeader from "./AdminHeader";
import PropTypes from 'prop-types';

const AdminView = ({type}) => {

    const adminType = type?type:'participant';

    return (
    <>
        <Row > <AdminHeader type={type}/> </Row>
        <Row>
            <Column> 
                <SearchFilterFactory type={adminType} />
            </Column>
            
        </Row>
    </>);
}

AdminView.propTypes = {
    type: PropTypes.string
}

export default AdminView;