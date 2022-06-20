import React from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import AdminFilterView from "../../admin/AdminFilterView";
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";

const AdminParticipantSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const URL = 'https://reqres.in/api/products/3';

    const fakeLocation = {items:[{name:"Belgrade",qty:113},{name:"New York",qty:203},{name:"Berlin",qty:100},{name:"London",qty:89},{name:"Paris",qty:95},{name:"Magdeburg",qty:0}]}
    const fakeRegistrationType = {items: [{name: "admin_ppr",qty: 10},{name: "admin_pcr",qty: 20},{name: "admin_np",qty: 30}]}

    const showRegistrationType = ({data}) => {
        return (<AdminFilterView data={fakeRegistrationType} header='registration_type'/>);
    }

    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={URL} successView={showRegistrationType}/>

    </>)

}
AdminParticipantSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminParticipantSearchFilter;
