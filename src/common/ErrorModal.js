import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';

import * as S from './ActionCancelModalStyle.js';

const ErrorModal = ({ header, message }) => {
  const { t } = useTranslation();

  const myHeader = header?t(header):null;

  const [displayModal, setDisplayModal] = React.useState(true);

  if (displayModal===false) {return null;}
  return (
    <Modal>
      <S.FlexColumn>
        <S.ActionCancelModalHeader>{myHeader}</S.ActionCancelModalHeader>
        <S.ModalMessage>
          {message}
        </S.ModalMessage>
        <S.ModalButtonsBar>
          <S.CancelButton onClick={()=> setDisplayModal(false)}>
            {t('form.cancel')}
          </S.CancelButton>
        </S.ModalButtonsBar>
      </S.FlexColumn>
    </Modal>
  );
}

ErrorModal.propTypes = {
  message: PropTypes.string,
  header: PropTypes.string,
}

export default ErrorModal;
