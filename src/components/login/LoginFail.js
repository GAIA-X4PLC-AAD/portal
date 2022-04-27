import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../../Modal';
import './Login_fail.css';
import { useNavigate } from 'react-router-dom';

const LoginFail = (props) => {
  
  const navigate = useNavigate();
  
  const message = props.message?props.t(props.message):null;

  if (props.showAlertMessage===false) return null;  
  return (
    <Modal>
      <div className="login-fail-flex-col">
        <div className='login-fail-header'>{props.t("login.fail.header")}</div>
        <div className='login-fail-content'> 
          {message}       
        </div>
        <div className='login-fail-footer'>
          <button className="gaiax-button layout" onClick={()=> navigate("/")}>
            {props.t('login.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default withTranslation() (LoginFail);