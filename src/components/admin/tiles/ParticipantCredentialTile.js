import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import AdminNaturalPersonDetails from "../tabs/AdminNaturalPersonDetails";
import ManagementHeader from "../tabs/ManagementHeader";


const ParticipantCredentialTile = ({ input }) => {

    const type = "admin_consumer";
    
    return (
        <ExpandableView initiallyExpanded={false} view={<AdminNaturalPersonDetails id={input.id}/>} title={<ManagementHeader participant={input}/>} border={true} />
    );

}

ParticipantCredentialTile.propTypes = {
    input: PropTypes.object
}

export default ParticipantCredentialTile;