import React from "react";
import { connect } from "react-redux";
import {compose} from 'redux';
import "./Login.css";
import { signInMenuEnter, signInMenuQuit } from "../../actions";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";


class Login extends React.Component {

  componentDidMount () {
    console.log(this.props);
    this.props.signInMenuEnter();
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

export default compose (withTranslation(),   connect( null,{signInMenuEnter, signInMenuQuit})) (Login);
