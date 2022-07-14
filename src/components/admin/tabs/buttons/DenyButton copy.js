import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { CancelButton } from "../../style";
import { useTranslation } from "react-i18next";


const DenyButton = ({id, searchRefresh})=>{

    const {t} = useTranslation();
    
    const onDeny = ( id) => {
        console.log(`onDeny ${id}`)
        axios.delete(process.env.REACT_APP_EDGE_API_URI +`/management/requests/${id}`).then(   (response) => {
            searchRefresh();
            console.log(`deny ${id} sucess`);
        },(error)=> {
            console.log(`ERROR on deny ${id}`);
            alert("ko");
          console.log(error);
        });     
    }
    return (<CancelButton onClick={()=>onDeny(id)}>{t('admin.deny')}</CancelButton>);
}
DenyButton.propTypes = {
    id: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default DenyButton;