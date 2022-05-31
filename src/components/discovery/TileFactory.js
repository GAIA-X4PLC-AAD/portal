import DataTile from "./dataTile/DataTile";
import PprTile from "./pprTile/PprTile";
import ServiceTile from "./servicetile/ServiceTile";
import PropTypes from 'prop-types';

const TileFactory = ({data, id}) => {
    const type = data?.type;
    const identifier = id || data?.id;
    //const type = 'service';

    switch (type) {
        case 'data': return DataTile ({input: data, identifier});
        case 'ppr': return PprTile({input: data, identifier});
        case 'service': return ServiceTile({input: data, identifier});
        default: return null;
    }
}
TileFactory.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string
}


export default TileFactory;