import PropTypes from 'prop-types';

import LoadingView from '../../loading_view/LoadingView';

import SearchFilterView from './SearchFilterView';

const DiscoverySearchFilter = ({ type, serviceId, slot }) => {

  const addParams = serviceId || slot || '' != ''?`/${serviceId}/${slot}`:'';

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}${addParams}/filter-criterias`;

  return (
    <LoadingView
      url={URL}
      successView={SearchFilterView} key={type}/>
  );

}
DiscoverySearchFilter.propTypes = {
  type: PropTypes.string,
  serviceId: PropTypes.string,
  slot: PropTypes.number
};

export default DiscoverySearchFilter;
