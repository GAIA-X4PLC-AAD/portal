import React, { useEffect, useState } from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";
import AdminTypeFilterView from "../../admin/AdminTypeFilterView";
import AdminLocationFilterView from "../../admin/AdminLocationFilterView";
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../../actions";

const AdminManagementSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const REQUEST_URL = process.env.REACT_APP_EDGE_API_URI + '/admin/management/request-types';
    const LOCATION_URL = process.env.REACT_APP_EDGE_API_URI + '/admin/management/locations';

//    const fakeLocation = {"items": [{"loc_code": "Germany","name": "Germany","qty": 10},{"loc_code": "Italy","name": "Italy","qty": 20}]}
//    const fakeRequestType = {items:[{name: "pr_cred",qty: 10},{name: "v_cred",qty: 20},{name: "sd",qty: 30}]}
    const [filters, setFilters] = useState([]);
    const dispatch = useDispatch();

    // updates redux filterCriteria every 1s if something has been changed. When there is a change in between, will wait 1s again
    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(updateFilterCriteria({ filterCriteria: filters }));
        }, 1000);
        return () => {
            clearTimeout(timerId);
    }
    }, [filters]);

    // update state of current filters
    const onFormChanged = (a) => {
        if (a.target.checked === true) {
            setFilters([...filters, { key: a.target.name, value: a.target.value }]);

        } else {
            setFilters(filters.filter(({ key, value }) => { return !(key === a.target.name && value === a.target.value) }));
        }
    }

    const showRequestType = ({data}) => {
        return (<AdminTypeFilterView data={data} header='request_type' onFormChanged={onFormChanged}/>);
    }

    const showLocation = ({data}) => {
        return (<AdminLocationFilterView data={data} header='location' onFormChanged={onFormChanged}/>);
    }

    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={REQUEST_URL} successView={showRequestType}/>
        <LoadingView url={LOCATION_URL} successView={showLocation}/>
    </>)


}
AdminManagementSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminManagementSearchFilter;
