import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../Modal';
import * as S from './styles.js';
import * as S2 from './ActionCancelModalStyle.js';

const ActionCancelModal = (props) => {
  
  const header = props.header?props.t(props.header):null;
  const message = props.message?props.t(props.message):null;
  const actionMessage = props.actionMessage?props.t(props.actionMessage):null;
  
  if (props.showAlertMessage===false) return null;  
  return (
    <Modal>
      <S2.FlexColumn>
        <S2.ActionCancelModalHeader>{header}</S2.ActionCancelModalHeader>
        <S2.ModalMessage> 
          {message}       
        </S2.ModalMessage>
        <S2.ModalButtonsBar>
          <S.CancelButton onClick={()=> props.cancelCallback()}>
            {props.t('form.cancel')}
          </S.CancelButton>
          <S.BlueButton onClick={()=> props.actionCallback()}>
            {actionMessage}
          </S.BlueButton>
        </S2.ModalButtonsBar>
      </S2.FlexColumn>
    </Modal>
  );
}

export default withTranslation() (ActionCancelModal);
