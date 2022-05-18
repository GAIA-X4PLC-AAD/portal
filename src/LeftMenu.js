import React from "react";
import {withTranslation} from 'react-i18next';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

class LeftMenu extends React.Component {

    render () {
        return (
            <div className="left-menu">
                <img src="images/sublogo.jpeg" alt={this.props.t('left-menu.logo-alt-text')}/>
                <Link to="/"> {this.props.t('left-menu.home')}</Link>
                <Link to="/services"> {this.props.t('left-menu.services')}</Link>
                <Link to="/data"> {this.props.t('left-menu.data')}</Link>
                <Link to="/provider"> {this.props.t('left-menu.provider')}</Link>
            </div>
        );

    }

}

LeftMenu.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(LeftMenu);