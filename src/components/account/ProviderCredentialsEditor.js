import React, {  useState } from "react";
import axios from "axios";
import ActionCancelModal from "../../common/ActionCancelModal";
import { useTranslation } from "react-i18next";
import config from "../../config/config.json";
import * as S from './ProviderCredentialStyle';

import PropTypes from 'prop-types';


const ProviderCredentialsEditor = (props) => {

    const {t} = useTranslation();
    // used for knowing if we are in a new user, or editting existing one.
    const isNewCredential = props.isNewCredential===undefined?false:props.isNewCredential;
    const isReadOnly = () => {
        if (isNewCredential) {
            return false;
        }
        return true;
    };

    // Hard code
    const roles = [{name:"PPR_USER"}, {name:"PPR_EDITOR"}];

    // used to store the intial status of the user
    const [loadUser, setLoadUser] = useState(props.loadUser);
    // changed user
    const [user, setUser] = useState (props.loadUser);
    // Read only display
    const [readOnly, setReadOnly] = useState(isReadOnly());
    // During saving, it is used to hide all the buttons.
    const [saving, setSaving] = useState(false);
    // to now if we are going to display or not onRemove
    const [onRemove, setOnRemove] = useState(false);


    // When something change on the form, will update user state
    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type==="checkbox"?e.target.checked:e.target.value;
        setUser(user => ({...user, [key]: value}));
    }

    // Cancel will remove changes performed
    const onCancel = () => {
        setReadOnly(true);
        setUser(loadUser);
        if (typeof props.cancelCallback === "function") props.cancelCallback();
    }

    // Updates existing user
    const updateUser= () => {
        setReadOnly(true);
        axios.put(process.env.REACT_APP_EDGE_API_URI+`/account/provider/users/${user.id}`, user).then(   (response) => {
            setLoadUser(response.data);
            setUser(response.data);
            setSaving(false);
            props.updateUser(response.data);    
        },(error)=> {
          console.log(error);
          setSaving(false);
          alert('ko');
        });     

    }

    // add new user
    const addNewUser= () => {
        setReadOnly(true);
        axios.post(process.env.REACT_APP_EDGE_API_URI+`/account/provider/users`, user).then(   (response) => {
            props.updateUser(response.data);           
        },(error)=> {
          console.log(error);
          alert('ko');
        });     

    }
    const deleteUser = () => {
        // axios.delete()
        axios.delete(process.env.REACT_APP_EDGE_API_URI+`/account/provider/users/${loadUser.id}`).then(   (response) => {
            props.deleteUser(loadUser);
        },(error)=> {
          console.log(error);
          alert('ko');
          setOnRemove(false);
        });     

    }

    // decides if it should add new user, or update existing one.
    const onSave = () => {
        setSaving(true);
        setReadOnly(true);
        if (isNewCredential) {
            addNewUser();
        } else {
            updateUser();
        }
    }

    // logic to decide if remove user should be displayed or not
    const showRemove = (user) => {
        if (isNewCredential || saving) return (<S.CredentialRemove/>);
        else return (
            <S.CredentialRemove onClick={() =>setOnRemove(true)}>
                {t('account.credentials.remove')}
                <ActionCancelModal
                    header={t('account.credentials.removeUserHeader')}
                    message={t('account.credentials.removeUserMessage', user)} 
                    showAlertMessage={onRemove} 
                    actionMessage={t('account.credentials.remove')}
                    actionCallback={()=>deleteUser()} 
                    cancelCallback={()=>setOnRemove(false)}/>
            </S.CredentialRemove>

        );

    }

    // Check if fields are properly informed or not.
    const onDisabledSaveButton = (u) => {
        if (user?.firstName ===loadUser?.firstName && user?.lastName ===loadUser?.lastName && user?.email ===loadUser?.email && user?.role ===loadUser?.role) return true;
        if (user?.firstName === undefined || user?.firstName ==='' ) return true;
        if (user?.lastName === undefined || user?.lastName ==='' ) return true;
        if (user?.email === undefined || user?.email ===''  ) return true;
        if (user?.role === undefined || user?.role ==='' ) return true;
        return false;
    }

    // check if edit/save buttons should be displays or not.
    const showEditSave = (u) => {
        if (saving === true) return null;
        if (readOnly && !isNewCredential) {
            return (
                <S.CredentialEditButton onClick={()=>setReadOnly(false)}>{t('account.credentials.edit')}</S.CredentialEditButton>
            );
        }
        if (!readOnly) {
            return (
                <React.Fragment>
                 
                    <S.CredentialCancelButton onClick={onCancel}>{t('account.credentials.cancel')}</S.CredentialCancelButton>
    
                    <S.CredentialEditButton onClick={onSave} disabled={onDisabledSaveButton(user)}>{t('account.credentials.save')}</S.CredentialEditButton>
                </React.Fragment>
    
            );
        }
    }

    // used for setting new file
    const selectValue = (input) => {
        if(input === undefined || input === null) {
            return '';
        }
        return input;
    }

    // Display different possible options for roles.
    const showRolesOptions = () => {
        return roles.map((role) =>{
            return (<option value={role.name} key={role.name}>{role.name}</option>);
        } );
    }

    return(
        <S.CredentialEditWrap>
            <S.CredentialEditColumn>
                <div >{t('account.credentials.firstName')}</div>
                <S.CredentialEditColumnInput type="text" name="firstName" value={user?.firstName} onChange={onFormChanged} disabled={readOnly}/>
            </S.CredentialEditColumn>
            <S.CredentialEditColumn>
                <div >{t('account.credentials.lastName')}</div>
                <S.CredentialEditColumnInput type="text" name="lastName" value={user?.lastName} onChange={onFormChanged} disabled={readOnly}/>
            </S.CredentialEditColumn>
            <S.CredentialEditRow>
                {t('account.credentials.email')}
            </S.CredentialEditRow>
            <S.CredentialEditRow>
                <S.CredentialEditRowInput type="text" name="email" value={user?.email} onChange={onFormChanged} disabled={readOnly}/>
            </S.CredentialEditRow>
            <S.CredentialEditRow>
                {t('account.credentials.role')}
            </S.CredentialEditRow>
            <S.CredentialEditRow>
            <S.CredentialEditRowSelect name="role" onChange={onFormChanged} disabled={readOnly} value={selectValue(user?.role)}>
                <option value="" disabled></option>
                {showRolesOptions()}
            </S.CredentialEditRowSelect>
                
            </S.CredentialEditRow>
            {showRemove(user)}
            {showEditSave(user)}
    </S.CredentialEditWrap>
    );
}

ProviderCredentialsEditor.propTypes = {

    loadUser: PropTypes.object,
    isNewCredential: PropTypes.bool,
    updateUser: PropTypes.func,
    deleteUser: PropTypes.func,
    cancelCallback: PropTypes.func,
}

export default ProviderCredentialsEditor;