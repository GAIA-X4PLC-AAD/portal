import React from "react";
import {withTranslation} from 'react-i18next';
import { Link } from "react-router-dom";
import { Fragment } from 'react';

const userSignedIn = false;
class TopMenu extends React.Component {


  showUserDetails() {
    return (
      <React.Fragment>
        {'User'}
      </React.Fragment>
    );
  };

   showRegisterSignin()  {

    return (
      <React.Fragment>
        <Link to="register"> {this.props.t('top-menu.register')}</Link>
        <Link to="signin"> {this.props.t('top-menu.signin')}</Link>
      </React.Fragment>
    );
  };


    render () {
        return (
    <div className='top-menu-container'>
        <div className='top-menu'>
          <div className='top-menu-logo'>
            <Link to="/">
              <img src="images/logo.svg" alt={this.props.t('left-menu.logo-alt-text')} height='60px'/>
            </Link>
          </div>
          <div className='top-menu-links'>
            <Link to="services"> {this.props.t('left-menu.services')}</Link>
            <Link to="data"> {this.props.t('left-menu.data')}</Link>
            <Link to="provider"> {this.props.t('left-menu.provider')}</Link>
          </div>
          <div className='top-menu-signin'>
            {userSignedIn?this.showUserDetails():this.showRegisterSignin()}
          </div>
        </div>
    </div>
        );
    }

}

export default withTranslation()(TopMenu);