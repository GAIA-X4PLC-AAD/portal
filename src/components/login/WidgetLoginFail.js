import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Modal from '../../Modal';

import './Login_fail.css';

const LoginFail = (props) => {
  const navigate = useNavigate();
  return (
    <Modal>
      <div className="login-fail-flex-col">
        <div className='login-fail-header'>{props.t('login.fail.header')}</div>
        <div className='login-fail-content'>
          {props.t('login.fail.widgetMessage')}
        </div>
        <div className='login-fail-footer'>
          <button className="gaiax-button" onClick={()=> navigate('/')}>
            {props.t('login.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

LoginFail.propTypes = {
  t: PropTypes.func,
}

export default withTranslation() (LoginFail);
