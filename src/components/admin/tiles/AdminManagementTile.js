import PropTypes from 'prop-types';
import React from 'react';

import ExpandableView from '../../expandable/ExpandableView';
import KeyValueDetails from '../tabs/KeyValueDetails';
import ManagementHeader from '../tabs/ManagementHeader';

const AdminManagementTile = ({ input , searchRefresh }) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + '/admin/management/requests';

  return (
    <ExpandableView initiallyExpanded={false} width='100%' view={<KeyValueDetails id={input.id} url_prefix={URL} searchRefresh={searchRefresh}/>} title={<ManagementHeader participant={input}/>} border={true} />
  );

}

AdminManagementTile.propTypes = {
  input: PropTypes.object,
  searchRefresh: PropTypes.func
}

export default AdminManagementTile;
