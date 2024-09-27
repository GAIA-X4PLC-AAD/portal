import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import { H4Text, Style } from '../../common/styles';
import LoadingView from '../loading_view/LoadingView';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

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
  const [_fake1, _setFake1] = useState(true);

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

  return <LoadingView
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
