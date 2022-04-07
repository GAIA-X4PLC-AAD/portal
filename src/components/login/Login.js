import React from "react";
import "./Login.css";

const Login = () => {

  return (
      <div classname="login-block5 layout">
        <div classname="login-group layout">
            <h1 classname="login-hero-title layout">Welcome to Gaia-X</h1>
            <h4 classname="login-highlights3 layout">Sign in to continue</h4>
            <hr classname="login-line2 layout" />
        </div>
        <div classname="login-block7 layout">
            <h2 classname="login-medium-title layout">
              Scan the QR code with your mobile device.
            </h2>
            <div classname="login-block8 layout">
              <iframe width="241px" height="243px">

              </iframe>            
            </div>
            <div classname="login-block10 layout">
              <h4 classname="login-highlights5 layout">FAQ &amp; Support</h4>
            </div>
            <h4 classname="login-highlights6-box layout">
              <div classname="login-highlights6">
                <span classname="login-highlights6-span0">
                  Don’t have any account?</span>
                  <span classname="login-highlights6-span1">Register now</span>
              </div>
            </h4>
        </div>
      </div>
  );

}
export default Login;
