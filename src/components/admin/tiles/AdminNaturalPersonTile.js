import React from "react";
import ExpandableView from "../../expandable/ExpandableView";
import PropTypes from 'prop-types';
import ParticipantHeader from "../tabs/ParticipantHeader";
import AdminNaturalPersonDetails from "../tabs/AdminNaturalPersonDetails";


const AdminNaturalPersonTile = ({ input }) => {

    const type = "admin_consumer";
    
    return (
        <ExpandableView initiallyExpanded={false} view={<AdminNaturalPersonDetails id={input.id}/>} title={<ParticipantHeader participant={input}/>} border={true} />
    );

}

AdminNaturalPersonTile.propTypes = {
    input: PropTypes.object
}

export default AdminNaturalPersonTile;