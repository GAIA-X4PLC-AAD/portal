import PropTypes from 'prop-types';
import AdminManagementSearchFilter from './AdminManagementSearchFilter.js';
import AdminParticipantSearchFilter from './AdminParticipantSearchFilter.js';
import DiscoverySearchFilter from './DiscoverySearchFilter.js';

const SearchFilterFactory = ({type,serviceId, slot}) => {
    
    switch (type) {
        case 'data': 
        case 'ppr': 
        case 'services': 
        return DiscoverySearchFilter({type});
        case 'solution_pkg':
            return DiscoverySearchFilter({type:'services', serviceId:serviceId, slot:slot});
        case 'participant': 
            return AdminParticipantSearchFilter({type});
        case 'management': 
            return AdminManagementSearchFilter({type});
        default: return null;
    }
}

SearchFilterFactory.propTypes = {
    type: PropTypes.string,
    serviceId: PropTypes.string,
    slot: PropTypes.number
};

export default SearchFilterFactory;
