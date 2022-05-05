import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../../Modal';
import './ActionCancelModal.css';

const ActionCancelModal = (props) => {
  
  const header = props.header?props.t(props.header):null;
  const message = props.message?props.t(props.message):null;
  const actionMessage = props.actionMessage?props.t(props.actionMessage):null;
  
  if (props.showAlertMessage===false) return null;  
  return (
    <Modal>
      <div className="action-cancel-modal-flex-col">
        <div className='action-cancel-modal-header'>{header}</div>
        <div className='action-cancel-modal-content'> 
          {message}       
        </div>
        <div className='action-cancel-modal-footer'>
          <button className="gaiax-cancel-button layout" onClick={()=> props.cancelCallback()}>
            Cancel
          </button>
          <button className="gaiax-button layout" onClick={()=> props.actionCallback()}>
            {actionMessage}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default withTranslation() (ActionCancelModal);
