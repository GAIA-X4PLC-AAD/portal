import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import ParticipantHeader from "../tabs/ParticipantHeader";
import AdminProviderDetails from "../tabs/AdminProviderDetails";
import KeyValueDetails from "../tabs/KeyValueDetails";


const AdminParticipantTile = ({ input }) => {

    const type = "admin_ppr";
    
    return (
        <ExpandableView initiallyExpanded={false} view={<KeyValueDetails id={input.id}/>} title={<ParticipantHeader participant={input}/>} border={true} />
    );

}

AdminParticipantTile.propTypes = {
    input: PropTypes.object
}

export default AdminParticipantTile;