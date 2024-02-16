import React, { useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { BlueButton } from "../../style.js";
import { useTranslation } from "react-i18next";
import {Tooltip} from "react-tooltip";


const ApproveButton = ({ id, searchRefresh }) => {

    const { t } = useTranslation();

    const onApprove = (id) => {
        axios.post(
            process.env.REACT_APP_EDGE_API_URI + `/admin/management/requests`,
            {
                id: `${id}`,
                status: 'accept'
            }
        ).then((response) => {
            searchRefresh();
        }, (error) => {
            console.error("Error occurred, can't approve ", error);
        });
    }
    return (
        <>
            <BlueButton onClick={() => onApprove(id)}
                        data-tooltip-id="admin.tooltip.approve"
                        data-tooltip-content={t('admin.tooltip.approve')}>
                {t('admin.approve')}
            </BlueButton>
            <Tooltip id="admin.tooltip.approve" />
        </>

    );
}
ApproveButton.propTypes = {
    id: PropTypes.string,
    searchRefresh: PropTypes.func
}

export default ApproveButton;