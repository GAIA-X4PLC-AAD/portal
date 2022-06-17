import React from "react";
import TileFactory from "../discovery/TileFactory";
import LoadingView from "../loading_view/LoadingView";


const AdminResults = () => {
    // TODO: change to right API call
    const URL = 'https://reqres.in/api/products/3';
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quam integer amet ultricies vel amet quam hendrerit. Massa feugiat facilisi eu eget. Senectus erat non et magna vitae facilisi purus. 

    Euismod ipsum, in molestie sit at mi. Curabitur praesent dignissim tortor odio vel, dolor diam urna feugiat. `

    const fakeData = {next:"/discovery/data/search?page=2&size=15",data:[{id:"1", participant_name: "Participant Name 1", type:"admin_ppr", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"2", participant_name: "Participant Name 1", type:"admin_np", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"3", participant_name: "Participant Name 1", type:"admin_ppr", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"4", participant_name: "Participant Name 1", type:"admin_np", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"5", participant_name: "Participant Name 1", type:"admin_ppr", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"6", participant_name: "Participant Name 1", type:"admin_np", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"7", participant_name: "Participant Name 1", type:"admin_ppr", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"8", participant_name: "Participant Name 1", type:"admin_np", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"9", participant_name: "Participant Name 1", type:"admin_ppr", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem},
                                                                         {id:"10", participant_name: "Participant Name 1", type:"admin_np", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem}],pages_count:40}


    const successView = ({data}) => {
        //if (!data || !data.data || data.data.length === 0) return NoResults();
        return (fakeData.data.map(item => {return <TileFactory data={item} id={`${item.id}`} key={item.id} />}));
    }

    

    return (
        <>
            <LoadingView url={URL} successView={successView}/>
        </>)
    

}

export default AdminResults;