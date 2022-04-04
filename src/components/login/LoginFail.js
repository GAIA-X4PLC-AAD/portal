/* This source code is exported from pxCode, you can get more document from https://www.pxcode.io */
import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../../Modal';
import './Login_fail.css';
import { useNavigate } from 'react-router-dom';

const LoginFail = (props) => {
  const navigate = useNavigate();
  return (
    <Modal>
      <div className="login-fail login-fail-block layout">
        <div className="login-fail-block1 layout">
          <div className="login-fail-flex layout">
            <h2 className="login-fail-medium-title layout">
              {props.t("login.fail.header")}
            </h2>
            <hr className="login-fail-line layout" />
          </div>
        </div>

        <div className="login-fail-block2 layout">
          <div className="login-fail-block3 layout">
            <div className="login-fail-block4 layout">
              <h4 className="login-fail-highlights layout">
                {props.t('login.fail.message')}
              </h4>

              <button className="login-fail-block5 layout" onClick={()=> navigate("/")}>
                <h4 className="login-fail-highlights1 layout">
                  {props.t('login.close')}
                </h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default withTranslation() (LoginFail);
