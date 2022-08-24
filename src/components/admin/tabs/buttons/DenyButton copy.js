import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { CancelButton } from "../../style";
import { useTranslation } from "react-i18next";


const DenyButton = ({id, searchRefresh})=>{

    const {t} = useTranslation();
    
    const onDeny = (id) => {
        axios.post(
            process.env.REACT_APP_EDGE_API_URI + `/admin/management/requests`,
            {
                id: `${id}`,
                status: 'deny'
            }
        ).then((response) => {
            searchRefresh();
        }, (error) => {
            console.error("Error occurred, can't deny ", error);
        });
    }
    return (<CancelButton onClick={()=>onDeny(id)}>{t('admin.deny')}</CancelButton>);
}
DenyButton.propTypes = {
    id: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default DenyButton;