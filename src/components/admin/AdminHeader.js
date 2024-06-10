import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Column, HeaderTitle } from '../../common/styles';

const AdminHeader = ({ type }) => {

  const { t } = useTranslation();

  if (!(type ==='management' || type === 'participant')) {return null;}
  return (
    <Column>
      <HeaderTitle>{t(`admin.${type}`)}</HeaderTitle>
      <div>{t(`admin.message-${type}`)}</div>
    </Column>
  );
}
AdminHeader.propTypes = {
  type: PropTypes.string
}

export default AdminHeader;
