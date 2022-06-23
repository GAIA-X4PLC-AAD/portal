import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { BlueButton } from "../../style";


const ApproveButton = ({id, searchRefresh})=>{

    
    const onApprove = ( id) => {
        console.log(`onApprove ${id}`)
        axios.post(process.env.REACT_APP_EDGE_API_URI +`/management/requests/${id}`).then(   (response) => {
            searchRefresh();
            console.log(`approved ${id} sucess`);
        },(error)=> {
            console.log(`ERROR on approved ${id}`);
            alert("ko");
          console.log(error);
        });     
    }
    return (<BlueButton onClick={()=>onApprove(id)}>Approve</BlueButton>);
}
ApproveButton.propTypes = {
    id: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default ApproveButton;