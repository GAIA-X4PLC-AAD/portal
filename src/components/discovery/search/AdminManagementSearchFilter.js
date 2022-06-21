import React from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";
import AdminTypeFilterView from "../../admin/AdminTypeFilterView";
import AdminLocationFilterView from "../../admin/AdminLocationFilterView";

const AdminManagementSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const URL = 'https://reqres.in/api/products/3';

    const fakeLocation = {"items": [{"loc_code": "Germany","name": "Germany","qty": 10},{"loc_code": "Italy","name": "Italy","qty": 20}]}
    const fakeRequestType = {items:[{name: "pr_cred",qty: 10},{name: "v_cred",qty: 20},{name: "sd",qty: 30}]}
    
    const showRequestType = ({data}) => {
        return (<AdminTypeFilterView data={fakeRequestType} header='request_type'/>);
    }

    const showLocation = ({data}) => {
        return (<AdminLocationFilterView data={fakeLocation} header='location'/>);
    }

    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={URL} successView={showRequestType}/>
        <LoadingView url={URL} successView={showLocation}/>
    </>)


}
AdminManagementSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminManagementSearchFilter;
