import React from 'react';
import { withTranslation } from 'react-i18next';
import Modal from '../Modal';
import * as S from './ActionCancelModalStyle.jsx';
import PropTypes from 'prop-types';


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

ActionCancelModal.propTypes = {
  t: PropTypes.func,
  actionCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
  showAlertMessage: PropTypes.bool,
  actionMessage: PropTypes.string,
  message: PropTypes.string,
  header: PropTypes.string,
  }

export default withTranslation() (ActionCancelModal);
