import DataTile from "./dataTile/DataTile.js";
import PprTile from "./pprTile/PprTile.js";
import ServiceTile from "./servicetile/ServiceTile.js";
import PropTypes from 'prop-types';
import CompositeServiceTile from "./servicetile/CompositeServiceTile.js";
import AdminManagementTile from "../admin/tiles/AdminManagementTile.js";
import AdminParticipantTile from "../admin/tiles/AdminParticipantTile.js";

const TileFactory = ({data, id, searchRefresh}) => {
    const type = data?.type;
    const identifier = id || data?.id;
    
    switch (type) {
        case 'data': return DataTile ({input: data, id: identifier});
        case 'ppr': return PprTile({input: data, id: identifier});
        case 'service': return ServiceTile({input: data, id: identifier});
        case 'composite-service': return CompositeServiceTile({input: data, id: identifier});
        case 'admin_ppr': 
        case 'admin_np': 
        case 'admin_pcr': return AdminParticipantTile({input: data, id:identifier});
        case 'sd': 
        case 'pr_cred': 
        case 'v_cred': return AdminManagementTile({input: data, id:identifier, searchRefresh: searchRefresh});
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