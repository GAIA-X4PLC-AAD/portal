import React, { useState, useRef, useEffect } from "react";


import PropTypes from 'prop-types';
import LoadingView from "../loading_view/LoadingView";
import { Style, BodySmallBoldText, Column, Row, CaptionText } from "../../common/styles";
import { Padding } from "../discovery/tabs/style";
import { Block } from "../expandable/style";

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
      <Style key={`${element['title']}${_index}`}>
        <Padding vertical='8px' horizontal='8px'>
          {colItemView({ title: element['title'], subtitle: element['subtitle'], caption: element['date'] })}
        </Padding>
      </Style>
    );
  })

  return <>
    <BodySmallBoldText>{props.params['title']}</BodySmallBoldText>
    <Block border={true} borderBottom={true} width={_leftPanelWidth}>
      {
        <Padding vertical='8px' horizontal='8px'>{(sectionItems !== undefined || sectionItems != null) ? sectionItemsViews : <></>}</Padding>
      }
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
        params={{'title': 'My Transactions'}}
      />
      <LoadingView
        url={_newsUrl}
        successView={sectionView}
        params={{'title': 'News'}}
      />
    </>
  )
}

SideSectionsView.propTypes = {

}

export default SideSectionsView
