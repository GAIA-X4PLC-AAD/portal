import PropTypes from 'prop-types';

import LoadingView from '../../../loading_view/LoadingView';

import DescriptionCompositeView from './DescriptionCompositeView';
import DescriptionDataView from './DescriptionDataView';
import DescriptionPprView from './DescriptionPprView';
import DescriptionTabView from './DescriptionTabView';

const DescriptionTab = ({ id, type }) => {

  let _type = type;
  if (_type == 'composite-service' || _type == 'service') {_type = 'services'}
  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${_type}/${id}/details/`;

  const getSuccessView = (type) => {
    switch (type ) {
    case 'service': return DescriptionTabView;
    case 'composite-service': return DescriptionCompositeView;
    case 'ppr':  return DescriptionPprView;
    case 'data': return DescriptionDataView;
    default: return DescriptionTabView;
    }
  }

  return (
    <LoadingView
      url={URL}
      params={{ 'type': type }}
      successView={getSuccessView(type)}
    />
  )
}

DescriptionTab.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTab
