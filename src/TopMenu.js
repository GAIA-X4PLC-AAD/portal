import React from "react";
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { signOut } from "./actions";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';


const UserInfoButton = ({ name }) => <button>{name}</button>;
function SignOutButton() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  // const _signOut = useSelector((signOut) => signOut)

  // console.log(`_signOut: ${_signOut}`)

  return <button onClick={ () => {
    console.log(`signOut, ${signOut}`)
    let _signOut = {
      type: 'SIGN_OUT'
  };

    // dispatch(_signOut)
  } }>{t('top-menu.signout')}</button>
}

function LoggedInUserButtons() {
  return <>
    <UserInfoButton name='AB' />
    <SignOutButton />
  </>
}

function SignInButton() {
  const { t, i18n } = useTranslation();
  return <Link to="/signin">{t('top-menu.signin')}</Link>;
}

function RegisterButton() {
  const { t, i18n } = useTranslation();
  return <Link to="/register">{t('top-menu.register')}</Link>;
}

function LoggedOutUserButtons() {
  return <>
    <RegisterButton />
    <SignInButton />
  </>
}


function TopBarButtons() {
  const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn)
  const isInSignInMenu = useSelector((state) => state.user.isInSignInMenu)

  return (<>
    {isUserSignedIn ? LoggedInUserButtons() : LoggedOutUserButtons()}
  </>)
}


class TopMenu extends React.Component {

  showUserDetails() {
    return (
      <React.Fragment>
        {/* { SignInButton('AB') } */}
        <button onClick={this.props.signOut}>{this.props.t('top-menu.signout')}</button>

      </React.Fragment>
    );
  };

  showRegisterSignin() {

    return (
      <React.Fragment>
        <Link to="/register"> {this.props.t('top-menu.register')}</Link>
        <Link to="/signin"> {this.props.t('top-menu.signin')}</Link>
      </React.Fragment>
    );
  };

  showSignInMenu() {
    if (this.props.isUserSignedIn) return this.showUserDetails();
    if (this.props.isInSignInMenu) return null;
    return this.showRegisterSignin();
  }

  render() {
    return (
      <div className='top-menu-container'>
        <div className='top-menu'>
          <div className='top-menu-logo'>
            <Link to="/">
              <img src="images/logo.svg" alt={this.props.t('left-menu.logo-alt-text')} height='60px' />
            </Link>
          </div>
          <div className='top-menu-links'>
            <Link to="/services"> {this.props.t('left-menu.services')}</Link>
            <Link to="/data"> {this.props.t('left-menu.data')}</Link>
            <Link to="/provider"> {this.props.t('left-menu.provider')}</Link>
          </div>
          <div className='top-menu-signin'>
            {/* {this.showSignInMenu()} */}
            <TopBarButtons />
          </div>

        </div>
      </div>
    );
  }

}
const mapStateToProps = state => {
  return { isInSignInMenu: state.signin.isInSignInMenu, isUserSignedIn: state.user.isUserSignedIn };
};

export default compose(withTranslation(), connect(mapStateToProps, { signOut }))(TopMenu);
