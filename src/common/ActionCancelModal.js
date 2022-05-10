import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../Modal';
import * as S from './ActionCancelModalStyle.js';

const ActionCancelModal = (props) => {
  
  const header = props.header?props.t(props.header):null;
  const message = props.message?props.t(props.message):null;
  const actionMessage = props.actionMessage?props.t(props.actionMessage):null;
  
  if (props.showAlertMessage===false) return null;  
  return (
    <Modal>
      <S.FlexColumn>
        <S.ActionCancelModalHeader>{header}</S.ActionCancelModalHeader>
        <S.ModalMessage> 
          {message}       
        </S.ModalMessage>
        <S.ModalButtonsBar>
          <S.CancelButton onClick={()=> props.cancelCallback()}>
            {props.t('form.cancel')}
          </S.CancelButton>
          <S.BlueButton onClick={()=> props.actionCallback()}>
            {actionMessage}
          </S.BlueButton>
        </S.ModalButtonsBar>
      </S.FlexColumn>
    </Modal>
  );
}

export default withTranslation() (ActionCancelModal);
