import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import LoadingViewDeprecated from '../../common/components/loadingIndicator/LoadingViewDeprecated';
import { H4Text, Style } from '../../common/styles';
import 'react-multi-carousel/lib/styles.css';

const PlotView = ({ plots }) => {

  return <Plot
    data={plots}
    layout={{

    }}
  />
}

PlotView.propTypes = {
  type: PropTypes.string,
  plots: PropTypes.array.isRequired,
};

const PlotSuccessView = (props,) => {

  const [_data, _setData] = useState(null);

  useEffect(() => {
    if (props.data !== undefined) {
      const _items = props.data['results']
      _setData(_items)
    }

  }, [props.data]);

  const itemsViews = (_data && _data.map((element1, _index) => {

    const plotViews = <PlotView plots={element1['charts']} key={`${_index}-${element1['name']}`} />

    return <Style key={`${_index}-${_index}`}>
      {(_data !== undefined && _data != null) ?
        <>
          <H4Text>{element1['name']}</H4Text>
          {plotViews}
        </> : <></>}
    </Style>
  })) || []

  return <>
    {itemsViews}
  </>;
}

PlotSuccessView.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
}

const PlotLoadingView = ({ url, title, }) => {

  return <LoadingViewDeprecated
    url={url}
    successView={PlotSuccessView}
    params={{ title: title }}
  />
}

PlotLoadingView.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PlotLoadingView;
