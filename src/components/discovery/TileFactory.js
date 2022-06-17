import DataTile from "./dataTile/DataTile";
import PprTile from "./pprTile/PprTile";
import ServiceTile from "./servicetile/ServiceTile";
import PropTypes from 'prop-types';
import CompositeServiceTile from "./servicetile/CompositeServiceTile";
import AdminProviderTile from "../admin/tiles/AdminProviderTile";
import AdminNaturalPersonTile from "../admin/tiles/AdminNaturalPersonTile";

const TileFactory = ({data, id}) => {
    const type = data?.type;
    const identifier = id || data?.id;
    
    switch (type) {
        case 'data': return DataTile ({input: data, id: identifier});
        case 'ppr': return PprTile({input: data, id: identifier});
        case 'service': return ServiceTile({input: data, id: identifier});
        case 'composite-service': return CompositeServiceTile({input: data, id: identifier});
        case 'admin_ppr': return AdminProviderTile({input: data, id:identifier});
        case 'admin_np': return AdminNaturalPersonTile({input: data, id:identifier});
        default: return null;
    }
}
TileFactory.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    data: PropTypes.object
}


export default TileFactory;