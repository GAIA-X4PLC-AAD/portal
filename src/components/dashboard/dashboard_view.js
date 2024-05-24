import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';

import { H4Text } from '../../common/styles';
import NextPrevButtons from '../../common/vertical_steps/next_prev_buttons';
import LoadingView from '../loading_view/LoadingView';

import MyServiceViewCard from './my_service_view_card';
import PlotLoadingView from './plot_view';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
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

const DashboardView = () => {

  const { t } = useTranslation();

  const buildPlot1 = () => {
    const _myDatasetsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/statistics';

    return <PlotLoadingView url={_myDatasetsUrl} title="testing" />
  }

  const buildList = () => {

    const _myServicesUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/services';
    const _myDatasetsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/datasets';
    const _mySpUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/sp';

    return (
      <>
        {/* <HeaderTitle>{t(`dashboard.reporting`)}</HeaderTitle> */}
        {buildPlot1()}
        {ServicesLoadingListView({ url: _myServicesUrl, title: t('dashboard.my_services'), type: 'services' })}
        {ServicesLoadingListView({ url: _myDatasetsUrl, title: t('dashboard.my_data_sets'), type: 'data' })}
        {ServicesLoadingListView({ url: _mySpUrl, title: t('dashboard.solution_packages'), type: 'sp' })}
      </>
    );
  }

  return buildList();
}

DashboardView.propTypes = {
  type: PropTypes.string
};

const ServicesListView = (props,) => {

  const [_items, setItems] = useState([]);

  useEffect(() => {
    if (props.data !== undefined) {
      const items = props.data['results']
      setItems(items)
    }

  }, [props.data]);

  const itemsViews = _items.map((element, _index) => {
    return <MyServiceViewCard key={`${element['id']}`} data={element} itemType={props.params['type']}/>
  })

  const shouldDisplayNextPrev = _items.length > 3;

  return <>
    <H4Text>{props.params['title']}</H4Text>
    <Carousel
      arrows={false}
      swipeable={false}
      draggable={false}
      responsive={responsive}
      renderButtonGroupOutside={shouldDisplayNextPrev}
      customButtonGroup={<NextPrevButtons />}>
      {(_items !== undefined || _items != null) ? itemsViews : <></>}
    </Carousel>
  </>;
}

ServicesListView.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
}

const ServicesLoadingListView = ({ url, title, type }) => {

  return (
    <>
      <LoadingView
        url={url}
        successView={ServicesListView}
        params={{ 'title': title, 'type': type }}
      />
    </>
  )
}

ServicesLoadingListView.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default DashboardView;
