import PropTypes from 'prop-types';

import AdminManagementTile from '../admin/tiles/AdminManagementTile';
import AdminParticipantTile from '../admin/tiles/AdminParticipantTile';

import DataTile from './dataTile/DataTile';
import PprTile from './pprTile/PprTile';
import CompositeServiceTile from './servicetile/CompositeServiceTile';
import ServiceTile from './servicetile/ServiceTile';

const TileFactory = ({ data, id, searchRefresh }) => {
  const type = data && data.type ? data.type : undefined;
  const identifier = id || (data && data.id ? data.id : undefined);

  switch (type) {
  case 'data': return DataTile ({ input: data, id: identifier });
  case 'ppr': return PprTile({ input: data, id: identifier });
  case 'service': return ServiceTile({ input: data, id: identifier });
  case 'composite-service': return CompositeServiceTile({ input: data, id: identifier });
  case 'admin_ppr':
  case 'admin_np':
  case 'admin_pcr': return AdminParticipantTile({ input: data, id:identifier });
  case 'sd':
  case 'pr_cred':
  case 'v_cred': return AdminManagementTile({ input: data, id:identifier, searchRefresh: searchRefresh });
  default: return null;
  }
}
TileFactory.propTypes = {
  input: PropTypes.object,
  id: PropTypes.string,
  data: PropTypes.object,
  searchRefresh: PropTypes.func
}

export default TileFactory;
