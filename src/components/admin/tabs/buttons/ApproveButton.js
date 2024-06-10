import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import { BlueButton } from '../../style';

const ApproveButton = ({ id, searchRefresh }) => {

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const { t } = useTranslation();

  const onApprove = (id) => {
    axios.post(
      process.env.REACT_APP_EDGE_API_URI + '/admin/management/requests',
      {
        id: `${id}`,
        status: 'accept'
      }
    ).then((response) => {
      searchRefresh();
    }, (error) => {
      console.error('Error occurred, can\'t approve ', error);
    });
  }
  return (
    <BlueButton onClick={() => onApprove(id)} data-tip={t('admin.tooltip.approve')}>
      {t('admin.approve')}
    </BlueButton>
  );
}
ApproveButton.propTypes = {
  id: PropTypes.string,
  searchRefresh: PropTypes.func
}

export default ApproveButton;
