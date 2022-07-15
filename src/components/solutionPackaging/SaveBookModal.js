import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import * as S from '../discovery/style';
import { useTranslation } from 'react-i18next';
import { BlueButton, CancelButton, Column, Row} from '../../common/styles';
import { ActionCancelModalHeader, ModalMessage } from '../../common/ActionCancelModalStyle';


const SaveBookModal = ({action, closeModal, onSaveBook}) => {

    const {t} = useTranslation();
    const [name, setName] = useState('');

     return (   
        <Modal width='fit-content'>
            <Column margin="8px 0px 0px 0px">
                <ActionCancelModalHeader>{t(`solution-pkg.saveBookModalMessage-${action}`)}</ActionCancelModalHeader>
                <ModalMessage> 
                    <input value={name} onChange={(e)=>setName(e.target.value)} /> 
                </ModalMessage>
                
                <Row margin='24px 24px 24px 10px'>
                    <CancelButton onClick={closeModal}>{t('solution_pkg.cancel')}</CancelButton>
                    <BlueButton disabled={name===''} onClick={()=>{onSaveBook(name, action)}}>{t(`solution_pkg.${action}`)}</BlueButton>
                </Row>
            </Column>
        </Modal>
    )
}
SaveBookModal.propTypes = {
    action: PropTypes.string,
    closeModal: PropTypes.func,
    onSaveBook: PropTypes.func
}


export default SaveBookModal;