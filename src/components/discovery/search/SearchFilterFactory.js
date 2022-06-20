import PropTypes from 'prop-types';
import AdminManagementSearchFilter from './AdminManagementSearchFilter';
import AdminParticipantSearchFilter from './AdminParticipantSearchFilter';
import DiscoverySearchFilter from './DiscoverySearchFilter';

const SearchFilterFactory = ({type}) => {
    
    switch (type) {
        case 'data': 
        case 'ppr': 
        case 'services': 
            return DiscoverySearchFilter({type});
        case 'participant': 
            return AdminParticipantSearchFilter({type});
        case 'management': 
            return AdminManagementSearchFilter({type});
        default: return null;
    }
}

SearchFilterFactory.propTypes = {
    type: PropTypes.string
};

export default SearchFilterFactory;
