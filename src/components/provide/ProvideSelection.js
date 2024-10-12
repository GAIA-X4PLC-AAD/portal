import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { resetDescriptorFile } from '../../actions';
import { BlueButton, BodyBoldText, BodySmallText, BodyText, HeaderTitle } from '../../common/styles';

import './ProvideSelection.css'

class ProvideSelection extends Component {
  constructor(props) {
    super(props);

    // reset the sd dialog state to ensure we get a fresh dialog.
    props.resetDescriptorFile();
  }

  render() {
    return (
      <div>
        <div className="provide-header-description">
          <HeaderTitle>Provide Service</HeaderTitle>
          <BodyText>What do you want to provide?</BodyText>
        </div>

        <div className="provide-selection">
          <div className="provide-selection-block">
            <BodyBoldText>Service name</BodyBoldText>
            <BodySmallText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus maecenas rhoncus sit sit sed quis urna leo.
            </BodySmallText>
            <NavLink to="/provide/services/upload"><BlueButton>Provide Service</BlueButton></NavLink>
          </div>
          <div className="provide-selection-block">
            <BodyBoldText>Data</BodyBoldText>
            <BodySmallText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus maecenas rhoncus sit sit sed quis urna leo.
            </BodySmallText>
            <NavLink to="/provide/data/upload"><BlueButton>Provide Data</BlueButton></NavLink>
          </div>
          <div className="provide-selection-block">
            <BodyBoldText>Node</BodyBoldText>
            <BodySmallText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus maecenas rhoncus sit sit sed quis urna leo.
            </BodySmallText>
            <NavLink to="/provide/nodes/upload"><BlueButton>Provide Node</BlueButton></NavLink>
          </div>
        </div>
      </div>
    );

  }
}

ProvideSelection.propTypes = {
  resetDescriptorFile: PropTypes.func
}

export default connect(null, { resetDescriptorFile })(ProvideSelection);
