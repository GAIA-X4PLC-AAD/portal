import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import AdminNaturalPersonDetails from "../tabs/AdminNaturalPersonDetails";
import ManagementHeader from "../tabs/ManagementHeader";


const AdminManagementTile = ({ input }) => {

    const type = "admin_consumer";
    
    return (
        <ExpandableView initiallyExpanded={false} view={<AdminNaturalPersonDetails id={input.id}/>} title={<ManagementHeader participant={input}/>} border={true} />
    );

}

AdminManagementTile.propTypes = {
    input: PropTypes.object
}

export default AdminManagementTile;