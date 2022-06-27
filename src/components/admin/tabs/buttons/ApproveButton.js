import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { BlueButton } from "../../style";
import { useTranslation } from "react-i18next";


const ApproveButton = ({id, searchRefresh})=>{

    const {t} = useTranslation();

    const onApprove = ( id) => {
        console.log(`onApprove ${id}`)
        axios.post(process.env.REACT_APP_EDGE_API_URI +`/api/management/requests/${id}`).then(   (response) => {
            searchRefresh();
            console.log(`approved ${id} sucess`);
        },(error)=> {
            console.log(`ERROR on approved ${id}`);
            alert("ko");
          console.log(error);
        });     
    }
    return (<BlueButton onClick={()=>onApprove(id)}>{t('admin.approve')}</BlueButton>);
}
ApproveButton.propTypes = {
    id: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default ApproveButton;