import React from "react";
import  ReactDOM from "react-dom";
import {withTranslation} from 'react-i18next';
import WorkInProgress from "./WorkInProgress";

class TopMenu extends React.Component {
    
    onClickWIP ( component) {
        ReactDOM.render(<WorkInProgress component={component}/>, document.getElementById('content'));
    }


    render () {
        return (
            <div className="top-menu">
                <a onClick={() => this.onClickWIP(this.props.t('top-menu.register'))}> {this.props.t('top-menu.register')}</a>
                <a onClick={() => this.onClickWIP(this.props.t('top-menu.signin'))}> {this.props.t('top-menu.signin')}</a>
                <a onClick={() => this.onClickWIP(this.props.t('top-menu.help'))}> {this.props.t('top-menu.help')}</a>
            </div>
        );

    }

}

export default withTranslation()(TopMenu);