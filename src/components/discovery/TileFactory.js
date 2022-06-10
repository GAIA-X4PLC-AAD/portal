import DataTile from "./dataTile/DataTile";
import PprTile from "./pprTile/PprTile";
import ServiceTile from "./servicetile/ServiceTile";
import PropTypes from 'prop-types';
import CompositeServiceTile from "./servicetile/CompositeServiceTile";

const TileFactory = ({data, id}) => {
    const type = data?.type;
    const identifier = id || data?.id;
    //const type = 'service';

    switch (type) {
        case 'data': return DataTile ({input: data, id: identifier});
        case 'ppr': return PprTile({input: data, id: identifier});
        case 'service': return ServiceTile({input: data, id: identifier});
        case 'composite-service': return CompositeServiceTile({input: data, id: identifier});
        default: return null;
    }
}
TileFactory.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string
}


export default TileFactory;