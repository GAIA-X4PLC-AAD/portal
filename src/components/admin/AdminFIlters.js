import React from "react";
import LoadingView from "../loading_view/LoadingView";
import PropTypes from 'prop-types';
import AdminFilterView from "./AdminFilterView";

const AdminFilters = () => {
    // TODO: change to right API call
    const URL = 'https://reqres.in/api/products/3';

    const fakeData = {type:"data",categories:[{name:"Location",items:[{name:"Belgrade",qty:113},{name:"New York",qty:203},{name:"Berlin",qty:100},{name:"London",qty:89},{name:"Paris",qty:95},{name:"Magdeburg",qty:0}]},{name:"Category #1",items:[{name:"filter item 1",qty:100},{name:"filter item 2",qty:200},{name:"filter item 3",qty:300}]}]}
    
    const showFilters = ({data}) => {
        return (<AdminFilterView data={fakeData}/>);
    }
    showFilters.propTypes = {
        data: PropTypes.object
    }
    
    return (
    <>
        <LoadingView url={URL} successView={showFilters}/>
    </>)

}

export default AdminFilters;