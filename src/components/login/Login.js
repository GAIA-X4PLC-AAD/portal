import React, {Component} from "react";
import {useState, useEffect } from "react";
import { connect } from "react-redux";
import {compose} from 'redux';
import "./Login.css";
import { signIn, signInMenuEnter, signInMenuQuit } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LoginFail from "./LoginFail";
import AuthPolling from "../AuthPolling";
import axios from "axios";
import configData from "../../config/config.json";

export const  withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
} 

class Login extends Component  {

  constructor(props){
    super(props);
    this.state = {
      showLoginFail:false,
      loginFailMessage: null,
      imgLink: null,
      walletLink: null
    }
 
  }

  
  componentDidMount () {
    this.props.signInMenuEnter();
    axios.get(configData.ONBOARDING_API_URI+`/register/user/did_register`)
    .then((body) => {
        let qrCodePath = body.data.qrCodePath;
        this.setState({imgLink: qrCodePath, walletLink: body.data.walletLink});
    })
  }

    onAuthZSuccess = () => {
      this.props.signIn();
      this.props.navigate('/');
    }
       
    onAuthZFailed = () => {
      this.setState({showLoginFail:true, loginFailMessage:null});
    }
    
    onAuthZWait() {
      console.log('onAuthZWait');
    }

    

    onWidgetInstalledCheck = () => {

      // if widget does not respond in 1 sec, show logging error message.
      let timeout = window.setTimeout(() =>{
        console.log('timeout');
        this.setState({showLoginFail:true, loginFailMessage:"login.fail.widgetMessage"});
      }, 1000);

      // add a listener for blur, if blur is trigger widget will be triggered and focus will be lost
      window.addEventListener('blur', event => {
        clearInterval(timeout);
      });
        
        // url to be redirected
        window.location.href = this.state.walletLink;;
    }

  
  componentWillUnmount () {
    this.props.signInMenuQuit();
  }


  render(){
    return (  
        <div className="login-block5 layout">
          <AuthPolling
            onAuthZFailed={this.onAuthZFailed}
            onAuthZSuccess={this.onAuthZSuccess}
            onAuthZWait={this.onAuthZWait}
          />
          <LoginFail showAlertMessage={this.state.showLoginFail} message={this.state.loginFailMessage}/>
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
                  <img src={this.state.imgLink} width="150px" height="150px" alt="Loading..."/>
                </div>
                <div className="login-button layout">
                  <a className="login-text layout" id={this.loginLinkRef} onClick={this.onWidgetInstalledCheck}>{this.props.t("login.loginButton")}</a>
                  </div>            
              </div>
              <div className="login-block10 layout">
                <Link to="/help"><h4 className="login-highlights5 layout">{this.props.t("login.faq")}</h4></Link>
              </div>
              <h4 className="login-highlights6-box layout">
                <div className="login-highlights6">
                  <span className="login-highlights6-span0" >
                    {this.props.t("login.missingAccount")}
                  </span>
                  <br/>
                    <span className="login-highlights6-span1"><Link to="/register">{this.props.t("login.register")}</Link></span>
                </div>
              </h4>
          </div>
        </div>
  
    );
  }

}

export default compose (withTranslation(),   connect( null,{signInMenuEnter, signInMenuQuit, signIn})) (withNavigation(Login));
