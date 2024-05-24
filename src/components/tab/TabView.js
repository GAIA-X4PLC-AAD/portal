import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { BodyText, Row, Style } from '../../common/styles';

import { SelectedTab, SeparatorLine } from './style';

const TabView = ({ labels, views }) => {

  const [selected, setSelected] = useState(0);

  const showSelected = (key) => {
    if (selected === key)
    {return (
      <SelectedTab/>
    );}
  }

  const showLabels = () => {
    return labels.map((label, index) => {
      return (
        <Style marginTop='24px' marginRight='28px' marginLeft='28px' marginBottom='12px' key={index}>
          <BodyText key={index} className="tab-label" onClick={() => setSelected(index)}>
            {label}
          </BodyText>
          {showSelected(index)}
        </Style>
      )
    }
    )
  }
  const showViews = (id) => {
    return (<React.Fragment key={id}>
      {views[id]}
    </React.Fragment>
    )
  }

  return (
    <Style width='864px;' marginBottom='24px'>
      <Row>
        {showLabels()}
      </Row>
      <SeparatorLine/>
      <Style paddingLeft='28px' paddingRight='28px' MarginBottom='24px'>
        {showViews(selected)}
      </Style>
    </Style>
  );
}

TabView.propTypes = {
  labels: PropTypes.array,
  views: PropTypes.array
}

export default TabView;
