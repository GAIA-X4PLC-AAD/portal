import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import ManagementHeader from "../tabs/ManagementHeader";
import KeyValueDetails from "../tabs/KeyValueDetails";


const AdminManagementTile = ({ input }) => {

    const URL = process.env.REACT_APP_EDGE_API_URI + '/admin/pr/registrations';
    
    return (
        <ExpandableView initiallyExpanded={false} view={<KeyValueDetails id={input.id} url_prefix={URL}/>} title={<ManagementHeader participant={input}/>} border={true} />
    );

}

AdminManagementTile.propTypes = {
    input: PropTypes.object
}

export default AdminManagementTile;