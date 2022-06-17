import PropTypes from 'prop-types';
import AdminSearchFilter from './AdminSearchFilter';
import DiscoverySearchFilter from './DiscoverySearchFilter';

const SearchFilterFactory = ({type}) => {
    
    switch (type) {
        case 'data': 
        case 'ppr': 
        case 'services': 
            return DiscoverySearchFilter({type});
        case 'participant': 
        case 'management': 
            return AdminSearchFilter({type});
        default: return null;
    }
}

SearchFilterFactory.propTypes = {
    type: PropTypes.string
};

export default SearchFilterFactory;
