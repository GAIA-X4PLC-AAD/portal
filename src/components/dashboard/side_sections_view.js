import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';

import { Style, BodySmallBoldText, Column, Row, CaptionText } from '../../common/styles';
import NextPrevButtons from '../../common/vertical_steps/next_prev_buttons';
import { Padding } from '../discovery/tabs/style';
import { Block } from '../expandable/style';
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
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const _leftPanelWidth = '225px'
const _maxItemsPerPage = 10

const colItemView = ({ title, caption, subtitle, }) => {
  return <Column>
    <Row justifyContent='space-between' alignItems='center'>
      <BodySmallBoldText>{title}</BodySmallBoldText>
      <CaptionText>{caption}</CaptionText>
    </Row>
    <CaptionText>{subtitle}</CaptionText>
  </Column>
}

const sectionView = (props,) => {

  const [sectionItems, setSection] = useState(null);

  useEffect(() => {
    if (props.data !== undefined) {
      const _items = props.data['results']
      setSection(_items)
    }

  }, [props.data]);

  const sectionItemsViews = (sectionItems && sectionItems.map((element, _index) => {
    return <Style key={`${element['title']}${_index}`} minWidth={_leftPanelWidth}>
      <Padding vertical='8px' horizontal='8px'>
        {colItemView({ title: element['title'], subtitle: element['subtitle'], caption: element['date'] })}
      </Padding>
    </Style>;
  })) || []

  const sectionItemsGroupedViews = []
  const chunkSize = _maxItemsPerPage;
  for (let i = 0; i < sectionItemsViews.length; i += chunkSize) {
    const chunk = <Column key={i}>{sectionItemsViews.slice(i, i + chunkSize)}</Column>
    sectionItemsGroupedViews.push(chunk)
  }

  const itemsViews2 = sectionItemsGroupedViews.map((element, _index) => {
    return element
  })

  const shouldDisplayNextPrev = sectionItemsViews.length > _maxItemsPerPage;

  return (
    <>
      <BodySmallBoldText>{`${props.params['title']} (${sectionItemsViews.length})`}</BodySmallBoldText>
      <Block border={true} borderBottom={true} position='relative'>
        {(sectionItems !== undefined || sectionItems != null) ?
          <Carousel
            arrows={false}
            swipeable={false}
            draggable={false}
            responsive={responsive}
            itemClass="carousel-item-padding-40-px"
            renderButtonGroupOutside={shouldDisplayNextPrev}
            customButtonGroup={<NextPrevButtons bottom="" position="absolute" top='-32px' right='0px'/>}
          >
            {itemsViews2}
          </Carousel> :
          <></>}
      </Block>
    </>
  );
}

sectionView.propTypes = {
  title: PropTypes.string.isRequired,
}

const SideSectionsView = () => {
  const { t } = useTranslation();

  const _transactionsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/transactions';
  const _newsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/news/';

  return (
    <>
      <LoadingView
        url={_transactionsUrl}
        successView={sectionView}
        params={{ title: t('dashboard.my_transactions') }}
      />
      <LoadingView
        url={_newsUrl}
        successView={sectionView}
        params={{ title: t('dashboard.news') }}
      />
    </>
  )
}

SideSectionsView.propTypes = {

}

export default SideSectionsView
