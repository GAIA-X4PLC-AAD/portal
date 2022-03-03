import React from "react";
import  ReactDOM from "react-dom";
import {withTranslation} from 'react-i18next';
import WorkInProgress from "./WorkInProgress";

class LeftMenu extends React.Component {
    onClickWIP ( component) {
        ReactDOM.render(<WorkInProgress component={component}/>, document.getElementById('content'));
    }


    render () {
        return (
            <div className="left-menu">
                <img src="images/sublogo.jpeg" alt={this.props.t('left-menu.logo-alt-text')}/>
                <button onClick={() => this.onClickWIP(this.props.t('left-menu.home'))}> {this.props.t('left-menu.home')}</button>
                <button onClick={() => this.onClickWIP(this.props.t('left-menu.services'))}> {this.props.t('left-menu.services')}</button>
                <button onClick={() => this.onClickWIP(this.props.t('left-menu.data'))}> {this.props.t('left-menu.data')}</button>
                <button onClick={() => this.onClickWIP(this.props.t('left-menu.provider'))}> {this.props.t('left-menu.provider')}</button>
            </div>
        );

    }

}

export default withTranslation()(LeftMenu);