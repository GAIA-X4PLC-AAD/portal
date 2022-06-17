import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import AdminNaturalPersonDetails from "../tabs/AdminNaturalPersonDetails";
import ManagementHeader from "../tabs/ManagementHeader";


const SelfDescriptionTile = ({ input }) => {

    const type = "admin_consumer";
    
    return (
        <ExpandableView initiallyExpanded={false} view={<AdminNaturalPersonDetails id={input.id}/>} title={<ManagementHeader participant={input}/>} border={true} />
    );

}

SelfDescriptionTile.propTypes = {
    input: PropTypes.object
}

export default SelfDescriptionTile;