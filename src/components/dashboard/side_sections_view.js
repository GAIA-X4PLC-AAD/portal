import React, { useState, useRef, useEffect } from "react";



import PropTypes from 'prop-types';
import LoadingView from "../loading_view/LoadingView";
import { Style, BodySmallBoldText, Column, Row, CaptionText } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import { Block } from "../expandable/style";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NextPrevButtons from "../../common/vertical_steps/next_prev_buttons";


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

const _leftPanelWidth = '225px'


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

  const [sectionItems, setSection] = useState([]);

  useEffect(() => {

    if (props.data !== undefined) {
      const _items = props.data['data']
      setSection(_items)
    }

  }, [props.data]);

  const sectionItemsViews = sectionItems.map((element, _index) => {
    return (
      <Style key={`${element['title']}${_index}`} width={_leftPanelWidth}>
        <Padding vertical='8px' horizontal='8px'>
          {colItemView({ title: element['title'], subtitle: element['subtitle'], caption: element['date'] })}
        </Padding>
      </Style>
    );
  })

  const sectionItemsGroupedViews = []
  const chunkSize = 10;
  for (let i = 0; i < sectionItemsViews.length; i += chunkSize) {
    const chunk = <Column>{sectionItemsViews.slice(i, i + chunkSize)}</Column>;
    sectionItemsGroupedViews.push(chunk)
  }

  const shouldDisplayNextPrev = sectionItemsViews.length > 3;

  return <>
    <BodySmallBoldText>{props.params['title']}</BodySmallBoldText>
    <Block border={true} borderBottom={true} width={_leftPanelWidth}>
      {(sectionItems !== undefined || sectionItems != null) ?
        <Carousel
          arrows={false}
          swipeable={true}
          draggable={false}
          responsive={responsive}
          renderButtonGroupOutside={shouldDisplayNextPrev}
          customButtonGroup={<NextPrevButtons bottom='0px' />}
        >
          <Row>{sectionItemsGroupedViews}</Row>
        </Carousel> :
        <></>}
    </Block>
  </>;
}


sectionView.propTypes = {
  title: PropTypes.string.isRequired,
}


const SideSectionsView = () => {

  const _transactionsUrl = process.env.REACT_APP_EDGE_API_URI + `/dashboard/transactions`;
  const _newsUrl = process.env.REACT_APP_EDGE_API_URI + `/dashboard/news/`;

  return (
    <>
      <LoadingView
        url={_transactionsUrl}
        successView={sectionView}
        params={{ 'title': 'My Transactions' }}
      />
      <LoadingView
        url={_newsUrl}
        successView={sectionView}
        params={{ 'title': 'News' }}
      />
    </>
  )
}

SideSectionsView.propTypes = {

}

export default SideSectionsView
