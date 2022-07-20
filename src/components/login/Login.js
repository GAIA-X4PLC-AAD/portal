import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from 'redux';
import "./Login.css";
import { changeUserRole, signIn, signInMenuEnter, signInMenuQuit } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LoginFail from "./LoginFail";
import AuthPolling from "./AuthPolling";
import axios from "axios";
import configData from "../../config/config.json";

import PropTypes from 'prop-types';
import { Column, OutlineButton, Padding, Row } from "../../common/styles";

export const withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}

const UserRolesSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // "FR", "Visitor", "PPR", "PCR User", "PCR Organization"

  const appMode = process.env.REACT_APP_MODE
  const isSecurityDisabled = appMode == 'SECURITY_DISABLED'

  if (!isSecurityDisabled) return null;

  const _currentUserRole = useSelector(state => state.user.user_role)

  const _changeUserRole = ({role}) => {
    dispatch(changeUserRole(role))
    dispatch(signIn())
    navigate('/')
  };

  return <Padding vertical='20px'>
    <Column>
      <Row>
        <OutlineButton onClick={() => _changeUserRole({role: 'ppr'})}>PPR</OutlineButton>
        <OutlineButton onClick={() => _changeUserRole({role: 'fr'})}>FR</OutlineButton>
        {/* <OutlineButton onClick={() => _changeUserRole({role: 'vr'})}>Visitor</OutlineButton> */}
      </Row>
      <Padding paddingTop='10px'></Padding>
      <Row>
        <OutlineButton onClick={() => _changeUserRole({role: 'pcr-user'})}>PCR User</OutlineButton>
        <OutlineButton onClick={() => _changeUserRole({role: 'pcr-org'})}>PCR Org.</OutlineButton>
      </Row>
    </Column>
  </Padding>
}

UserRolesSection.propTypes = {

};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginFail: false,
      loginFailMessage: null,
      imgLink: null,
      walletLink: null,
      pollingUrl: null
    }

  }

  componentDidMount() {
    this.props.signInMenuEnter();
    axios.get(process.env.REACT_APP_EDGE_API_URI + '/onboarding/qr')
      .then((body) => {
        let qrCodePath = body.data.qrCodePath;
        this.setState({ imgLink: qrCodePath, walletLink: body.data.walletLink, pollingUrl: body.data.pollUrl });
      })
  }

  onAuthZSuccess = () => {
    this.props.signIn();
    this.props.navigate('/');
  }

  onAuthZFailed = () => {
    this.setState({ showLoginFail: true, loginFailMessage: null });
  }

  onAuthZWait() {
    console.log('onAuthZWait');
  }



  onWidgetInstalledCheck = () => {

    // if widget does not respond in 1 sec, show logging error message.
    let timeout = window.setTimeout(() => {
      console.log('timeout');
      this.setState({ showLoginFail: true, loginFailMessage: "login.fail.widgetMessage" });
    }, 1000);

    // add a listener for blur, if blur is trigger widget will be triggered and focus will be lost
    window.addEventListener('blur', event => {
      clearInterval(timeout);
    });

    // url to be redirected
    window.location.href = this.state.walletLink;
  }


  componentWillUnmount() {
    this.props.signInMenuQuit();
  }


  render() {

    const appMode = process.env.REACT_APP_MODE
    const isSecurityDisabled = appMode == 'SECURITY_DISABLED'

    return (
      <div className="login-block5 layout">
        {
          isSecurityDisabled || this.state.pollingUrl === null? '' : <AuthPolling
            onAuthZFailed={this.onAuthZFailed}
            onAuthZSuccess={this.onAuthZSuccess}
            onAuthZWait={this.onAuthZWait}
            statusURL={this.state.pollingUrl}
          />
        }

        <LoginFail showAlertMessage={this.state.showLoginFail} message={this.state.loginFailMessage} />
        <div className="login-group layout">
          <h1 className="login-hero-title layout">{this.props.t("login.welcome")}</h1>
          <h4 className="login-highlights3 layout">{this.props.t("login.signinContinue")}</h4>
          <hr className="login-line2 layout" />
        </div>
        <div className="login-block7 layout">
          <h2 className="login-medium-title layout">
            {this.props.t("login.scanMessage")}
          </h2>
          <div className="login-block8 layout">
            <div width="241px" height="243px">
              <img src={this.state.imgLink} width="150px" height="150px" alt="Loading..." />
            </div>
            <div className="login-button layout">
              <a className="login-text layout" id={this.loginLinkRef} onClick={this.onWidgetInstalledCheck}>{this.props.t("login.loginButton")}</a>
            </div>
            <UserRolesSection />
          </div>
          <div className="login-block10 layout">
            <Link to="/help"><h4 className="login-highlights5 layout">{this.props.t("login.faq")}</h4></Link>
          </div>
          <h4 className="login-highlights6-box layout">
            <div className="login-highlights6">
              <span className="login-highlights6-span0" >
                {this.props.t("login.missingAccount")}
              </span>
              <br />
              <span className="login-highlights6-span1"><Link to="/register">{this.props.t("login.register")}</Link></span>
            </div>
          </h4>
        </div>
      </div>

    );
  }

}

Login.propTypes = {
  t: PropTypes.func,
  signInMenuEnter: PropTypes.func,
  signIn: PropTypes.func,
  navigate: PropTypes.func,
  signInMenuQuit: PropTypes.func,
}

export default compose(withTranslation(), connect(null, { signInMenuEnter, signInMenuQuit, signIn }))(withNavigation(Login));
