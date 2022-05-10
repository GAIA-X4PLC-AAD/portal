import React, { useEffect, useState } from "react";
import "./ProviderCredentials.css";
import axios from "axios";
import ProviderCredentialsEditor from "./ProviderCredentialsEditor";
import { withTranslation } from "react-i18next";
import config from '../../config/config.json';
import * as S from './ProviderCredentialStyle';

const ProviderCredentials = (props) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState (null);
    const [onAddUser, setOnAddUser] = useState(false);

    const providerId=1

    useEffect(()=>{
        axios.get(config.EDGE_API_URI+`/user-account/ppr/${providerId}/users`).then(   (response) => {
            console.log(response.data);
            setUsers(response.data);
    },(error)=> {
          console.log(error);
          alert('ko');
    });
    },[]);


    const deleteUser = (user) => {
        setUsers (users.filter(u => !(u.id === user.id)));
        setSelectedUser(null);
    }
    const updateUser = (user) => {
        setUsers (users.map((u) => u.id === user.id? user:u));
    }
    
    const addUser = (user) => {
        setUsers ([...users ,user]);
        setOnAddUser(false);
    }

    const showEdit = (user) => {
        if (selectedUser === null || user.id !== selectedUser.id) return null;
        return(
            <ProviderCredentialsEditor loadUser={user} updateUser={updateUser} deleteUser={deleteUser}/>
        );
    }

    const onAddUserClick = () => {
        setSelectedUser(null);
        setOnAddUser(true);
    }

    const showAddUser = () => {
        if (onAddUser === false) {
            return (
                <div className="credential-add-user-button" onClick={onAddUserClick}>{props.t('account.credentials.addUser')}</div>   
            );
        }
        return (
            <ProviderCredentialsEditor loadUser={null} updateUser={addUser} cancelCallback={()=>setOnAddUser(false)} isNewCredential={true}/>
        );
    }


    const showArrow = (user) => {
        if (selectedUser === null || user.id !== selectedUser.id) {
            return (
                <img src="/images/DropDownArrowDown.svg" alt="Clickable arrow to fold down details" onClick={()=> {setSelectedUser(user); setOnAddUser(false);}}/>
            );
        }
        return (
            <img src="/images/DropDownArrowUp.svg" alt="Clickable arrow to fold up details" onClick={()=> {setSelectedUser(null)}}/>            
            
            );
            //<S.CredentialDropDownUp />
    }
    //<img src={'/images/DropDownArrowUp.svg'} alt="Clickable arrow to fold up details" onClick={()=> {setSelectedUser(null)}}/>            
//<img src="/images/DropDownArrowUp.svg" alt="Clickable arrow to fold up details" onClick={()=> {setSelectedUser(null)}}/>
    const showUsers = (users) => {
        return (
            users.map((user) => {
                return (
                    <S.FlexCell key={user.id}>
                        <S.FlexRow>{user.userName}</S.FlexRow>
                        <S.FlexRow>{user.role}</S.FlexRow>
                        <S.CredentialDropDown>
                            {showArrow(user)}
                        </S.CredentialDropDown>
                        {showEdit(user)}
                    </S.FlexCell>
                );
            }));
    };


    
    return(
        <S.CredentialWrapper>
            <S.FlexHeader>
                <S.FlexRow>{props.t('account.credentials.name')}</S.FlexRow>
                <S.FlexRow>{props.t('account.credentials.role')}</S.FlexRow>
                <S.CredentialDropDown></S.CredentialDropDown>
            </S.FlexHeader>
            {showUsers(users)}
            {showAddUser()}
        </S.CredentialWrapper>
    );
}

export default withTranslation () (ProviderCredentials);