import React from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import AdminFilterView from "../../admin/AdminFilterView";
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";

const AdminManagementSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const URL = 'https://reqres.in/api/products/3';

    const fakeLocation = {type:"data",categories:[{name:"Location",items:[{name:"Belgrade",qty:113},{name:"New York",qty:203},{name:"Berlin",qty:100},{name:"London",qty:89},{name:"Paris",qty:95},{name:"Magdeburg",qty:0}]},{name:"Category #1",items:[{name:"filter item 1",qty:100},{name:"filter item 2",qty:200},{name:"filter item 3",qty:300}]}]}
    const fakeRequestType = {items:[{name: "pr_cred",qty: 10},{name: "v_cred",qty: 20},{name: "sd",qty: 30}]}
    
    const showRequestType = ({data}) => {
        return (<AdminFilterView data={fakeRequestType} header='request_type'/>);
    }

    const showLocation = ({data}) => {
        return (<AdminFilterView data={fakeLocation} header='location'/>);
    }

    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={URL} successView={showRequestType}/>
    </>)


}
AdminManagementSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminManagementSearchFilter;
