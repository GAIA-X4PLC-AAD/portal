import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from 'redux';
import "./Login.css";
import { signIn } from "../../actions/index.js";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LoginFail from "./LoginFail.js";
import AuthPolling from "./AuthPolling.js";
import axios from "axios";
import PropTypes from 'prop-types';
import { Column, OutlineButton, Padding, Row } from "../../common/styles.js";
import { t } from "i18next";
import { FR_ROLE, PPR_ROLE, PCR_ROLE, VR_ROLE, userData, storeJWT } from '../../common/auth.js';

export const withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}

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
    axios.get(process.env.REACT_APP_EDGE_API_URI + '/onboarding/qr')
      .then((body) => {
        this.setState(
          {
            imgLink: body.data.qrCodePath,
            walletLink: body.data.walletLink,
            pollingUrl: body.data.pollUrl
          }
        );
      })
  }

  onAuthZSuccess = (data) => {
    storeJWT(data)

    this.props.signIn();
    this.props.navigate('/');
  }

  onAuthZFailed = () => {
    this.setState({ showLoginFail: true, loginFailMessage: t('login.fail.authorization_fail_message') });
  }

  onAuthZWait() {
  }



  onWidgetInstalledCheck = () => {

    // if widget does not respond in 1 sec, show logging error message.
    let timeout = window.setTimeout(() => {
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
    // this.props.signInMenuQuit();
  }


  render() {
    return (
      <div className="login-block5 layout">
        {
          this.state.pollingUrl === null ? '' : <AuthPolling
            onAuthZFailed={this.onAuthZFailed}
            onAuthZSuccess={this.onAuthZSuccess}
            onAuthZWait={this.onAuthZWait}
            statusURL={this.state.pollingUrl}
            continuePollingOnFailure={true}
          />
        }

        <LoginFail showAlertMessage={this.state.showLoginFail} message={this.state.loginFailMessage} onClose={() => { this.setState({ showLoginFail: false }) }} />
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
            <img className="login-image16 layout" src={this.state.imgLink} alt="Loading..." />
          </div>
          <div className="login-button layout">
            <a className="login-text layout" id={this.loginLinkRef} onClick={this.onWidgetInstalledCheck}>{this.props.t("login.loginButton")}</a>
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
  signIn: PropTypes.func,
  navigate: PropTypes.func,
}

export default compose(withTranslation(), connect(null, { signIn }))(withNavigation(Login));
