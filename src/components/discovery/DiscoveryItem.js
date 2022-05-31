import React from "react";
import TileFactory from "./TileFactory";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

const DiscoveryItem = ({type}) => {
    const id =  useParams();
    const dataItem = { "type": "data","logo": "/images/logo-placeholder.svg", "ppr_url": "URL to PPR", "name": "data name","ppr_name": "PPR name", "id": "data id", "short_description": "String", "location": "String"};
    const pprItem = {  "type": "ppr","logo": "/images/logo-placeholder.svg", "ppr_url": "URL to PPR", "name": "PPR name","id": "PPR id","sustainability": "String","availability": "String", "location": "String"};
    const serviceItem = { "type": "service","logo": "/images/logo-placeholder.svg","name": "Service name","id": "service id","ppr_name": "Provider name","ppr_url": "URL to PPR","stack": "String","security": "String","location": "String"};

    switch (type) {
        case 'data': return TileFactory ({data: dataItem, id});
        case 'ppr': return TileFactory({data:pprItem, id});
        case 'service': return TileFactory({data:serviceItem, id});
        default: return null;
    }

}

DiscoveryItem.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string
}

export default DiscoveryItem;