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
                <button onClick={() => this.onClickWIP(this.props.t('top-menu.register'))} href="#"> {this.props.t('top-menu.register')}</button>
                <button onClick={() => this.onClickWIP(this.props.t('top-menu.signin'))} href="#"> {this.props.t('top-menu.signin')}</button>
                <button onClick={() => this.onClickWIP(this.props.t('top-menu.help'))} href="#"> {this.props.t('top-menu.help')}</button>
            </div>
        );

    }

}

export default withTranslation()(TopMenu);