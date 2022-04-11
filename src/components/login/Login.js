import React, {Component} from "react";
import { connect } from "react-redux";
import {compose} from 'redux';
import "./Login.css";
import { signIn, signInMenuEnter, signInMenuQuit } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LoginFail from "./LoginFail";
import AuthPolling from "../AuthPolling";

export const  withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
} 

class Login extends Component  {

  constructor(props){
    super(props);
    this.state = {
      showLogginFail:false
    }

  }

  componentDidMount () {
    this.props.signInMenuEnter();
  }

    onAuthZSuccess = () => {
      this.props.signIn();
      this.props.navigate('/');
    }
       
    onAuthZFailed = () => {
      this.setState({showLogginFail:true});
    }
    
    onAuthZWait() {
      console.log('onAuthZWait');
    }


  componentWillUnmount () {
    this.props.signInMenuQuit();
  }

  render(){
    return (  
        <div className="login-block5 layout">
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
                <AuthPolling
                  onAuthZFailed={this.onAuthZFailed}
                  onAuthZSuccess={this.onAuthZSuccess}
                  onAuthZWait={this.onAuthZWait}
                />
                <LoginFail showAlertMessage={this.state.showLogginFail}/>
                <iframe width="241px" height="243px">
  
                </iframe>            
              </div>
              <div className="login-block10 layout">
                <Link to="/help"><h4 className="login-highlights5 layout">{this.props.t("login.faq")}</h4></Link>
              </div>
              <h4 className="login-highlights6-box layout">
                <div className="login-highlights6">
                  <span className="login-highlights6-span0" >
                  {this.props.t("login.missingAccount")}</span>
                    <span className="login-highlights6-span1"><Link to="/register">{this.props.t("login.register")}</Link></span>
                </div>
              </h4>
          </div>
        </div>
  
    );
  }

}

export default compose (withTranslation(),   connect( null,{signInMenuEnter, signInMenuQuit, signIn})) (withNavigation(Login));
