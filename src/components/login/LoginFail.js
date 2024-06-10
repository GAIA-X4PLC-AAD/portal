import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Modal from '../../Modal';

import './Login_fail.css';

const LoginFail = (props) => {

  const navigate = useNavigate();

  const message = props.message?props.t(props.message):null;

  const onClose = () => {
    if (props.onClose) {props.onClose();}
    else {navigate('/');}
  }

  if (props.showAlertMessage===false) {return null;}
  return (
    <Modal>
      <div className="login-fail-flex-col">
        <div className='login-fail-header'>{props.t('login.fail.header')}</div>
        <div className='login-fail-content'>
          {message}
        </div>
        <div className='login-fail-footer'>
          <button className="gaiax-button layout" onClick={onClose}>
            {props.t('login.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

LoginFail.propTypes = {
  t: PropTypes.func,
  showAlertMessage: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func
}

export default withTranslation() (LoginFail);
