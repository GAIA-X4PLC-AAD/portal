import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import ManagementHeader from "../tabs/ManagementHeader";
import KeyValueDetails from "../tabs/KeyValueDetails";
import { useResource } from "@axios-use/react";


const AdminManagementTile = ({ input , searchRefresh}) => {

    const URL = process.env.REACT_APP_EDGE_API_URI + '/api/admin/pr/registrations';
    
    return (
        <ExpandableView initiallyExpanded={false} width='100%' view={<KeyValueDetails id={input.id} url_prefix={URL} searchRefresh={searchRefresh}/>} title={<ManagementHeader participant={input}/>} border={true} />
    );

}

AdminManagementTile.propTypes = {
    input: PropTypes.object,
    searchRefresh: PropTypes.func
}

export default AdminManagementTile;