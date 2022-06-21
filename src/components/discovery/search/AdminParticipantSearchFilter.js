import React from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";
import AdminTypeFilterView from "../../admin/AdminTypeFilterView";
import AdminLocationFilterView from "../../admin/AdminLocationFilterView";

const AdminParticipantSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const URL = 'https://reqres.in/api/products/3';

    const fakeLocation = {"items": [{"loc_code": "Germany","name": "Germany","qty": 10},{"loc_code": "Italy","name": "Italy","qty": 20}]}
    const fakeRegistrationType = {items: [{name: "admin_ppr",qty: 10},{name: "admin_pcr",qty: 20},{name: "admin_np",qty: 30}]}

    const showRegistrationType = ({data}) => {
        return (<AdminTypeFilterView data={fakeRegistrationType} header='registration_type'/>);
    }

    const showLocation = ({data}) => {
        return (<AdminLocationFilterView data={fakeLocation} header='location'/>);
    }


    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={URL} successView={showRegistrationType}/>
        <LoadingView url={URL} successView={showLocation}/>
    </>)

}
AdminParticipantSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminParticipantSearchFilter;
