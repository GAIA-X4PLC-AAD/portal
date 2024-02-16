import React from "react";
import ExpandableView from "../../expandable/ExpandableView.js";
import PropTypes from 'prop-types';
import ParticipantHeader from "../tabs/ParticipantHeader.js";
import KeyValueDetails from "../tabs/KeyValueDetails.js";


const AdminParticipantTile = ({ input }) => {

    const URL = process.env.REACT_APP_EDGE_API_URI + '/admin/pr/registrations';

    
    return (
        <ExpandableView initiallyExpanded={false} width='100%' view={<KeyValueDetails id={input.id} url_prefix={URL}/>} title={<ParticipantHeader participant={input}/>} border={true} />
    );

}

AdminParticipantTile.propTypes = {
    input: PropTypes.object
}

export default AdminParticipantTile;