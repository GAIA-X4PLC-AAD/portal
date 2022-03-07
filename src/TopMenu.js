import React from "react";
import {withTranslation} from 'react-i18next';
import { Link } from "react-router-dom";

class TopMenu extends React.Component {
    

    render () {
        return (
            <div className="top-menu">
                <Link to="register"> {this.props.t('top-menu.register')}</Link>
                <Link to="signin"> {this.props.t('top-menu.signin')}</Link>
                <Link to="help"> {this.props.t('top-menu.help')}</Link>
            </div>
        );

    }

}

export default withTranslation()(TopMenu);