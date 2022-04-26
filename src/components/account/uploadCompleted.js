import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../../Modal';
import './upload_completed.css';
import { useNavigate } from 'react-router-dom';

const UploadCompleted = (props) => {
  
  const navigate = useNavigate();
  
  const message = props.message?props.t(props.message):null;

  if (props.showAlertMessage===false) return null;  
  return (
    <Modal>
      <div className="upload-completed-flex-col">
        <div className='upload-completed-header'>{props.t("account.edit.uploadCompleted")}</div>
        <div className='upload-completed-content'> 
          {message}       
        </div>
        <div className='upload-completed-footer'>
          <button className="gaiax-button layout" onClick={()=> navigate("/")}>
            {props.t('login.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default withTranslation() (UploadCompleted);
