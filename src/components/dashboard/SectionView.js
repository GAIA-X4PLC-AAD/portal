import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';

import LoadingViewDeprecated from '../../common/components/loadingIndicator/LoadingViewDeprecated';
import { BodySmallBoldText, CaptionText, Column, Row, Style } from '../../common/styles';
import NextPrevButtons from '../../common/vertical_steps/next_prev_buttons';
import { Padding } from '../discovery/tabs/style';
import { Block } from '../expandable/style';
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

const SectionView = (props,) => {

  const [sectionItems, setSection] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if ('data' in props && props.data && 'results' in props.data) {
      // eslint-disable-next-line react/prop-types
      setSection(props.data.results)
    }
    // eslint-disable-next-line react/prop-types
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
      {/* eslint-disable-next-line react/prop-types */}
      <BodySmallBoldText>{`${props.params['title']} (${sectionItemsViews.length})`}</BodySmallBoldText>
      <Block border={true} borderBottom={true} position='relative'>
        {(sectionItems) ?
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

SectionView.propTypes = {
  title: PropTypes.string.isRequired,
}

const SideSectionsView = () => {
  const { t } = useTranslation();

  const _transactionsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/transactions';
  const _newsUrl = process.env.REACT_APP_EDGE_API_URI + '/dashboard/news/';

  return (
    <>
      <LoadingViewDeprecated
        url={_transactionsUrl}
        successView={SectionView}
        params={{ title: t('dashboard.my_transactions') }}
      />
      <LoadingViewDeprecated
        url={_newsUrl}
        successView={SectionView}
        params={{ title: t('dashboard.news') }}
      />
    </>
  )
}

SideSectionsView.propTypes = {

}

export default SideSectionsView
