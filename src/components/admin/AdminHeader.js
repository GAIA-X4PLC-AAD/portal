import React from "react";
import { Column, HeaderTitle } from "../../common/styles";
import PropTypes from 'prop-types';

const AdminHeader = ({type}) => {

    return (<>
        <Column>
            <HeaderTitle>{type}</HeaderTitle>
            <div>Lorem ipsum dolor si jet subtitle</div>
        </Column>
        </>);
}
AdminHeader.propTypes = {
    type: PropTypes.string
}


export default AdminHeader;