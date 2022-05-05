import React, { useEffect, useState } from "react";
import "./ProviderCredentials.css";
import axios from "axios";
import ProviderCredentialsEditor from "./ProviderCredentialsEditor";
import { withTranslation } from "react-i18next";
import config from '../../config/config.json';

const ProviderCredentials = (props) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState (null);
    const [onAddUser, setOnAddUser] = useState(false);

    const providerId=1

    useEffect(()=>{
        axios.get(config.EDGE_API_URI+`/account/ppr/${providerId}/users`).then(   (response) => {
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
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> {setSelectedUser(user); setOnAddUser(false);}}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.454512 0.907251C0.816397 0.53695 1.40995 0.530128 1.78025 0.892012L8 6.9704L14.2197 0.892012C14.59 0.530128 15.1836 0.53695 15.5455 0.907251C15.9074 1.27755 15.9005 1.8711 15.5302 2.23299L8.87367 8.73829C8.38794 9.21297 7.61206 9.21297 7.12633 8.73829L0.469751 2.23299C0.0994505 1.8711 0.092628 1.27755 0.454512 0.907251Z" fill="#000094"/>
                </svg>
            );
        }
        return (
            <svg viewBox="0.188 0.625 15.625 8.469" width="15.625" height="8.469" onClick={()=> setSelectedUser(null)}>
                <path fillRule="evenodd" clipRule="evenodd" d="M 0.455 0.907 C 0.816 0.537 1.41 0.53 1.78 0.892 L 8 6.97 L 14.22 0.892 C 14.59 0.53 15.184 0.537 15.546 0.907 C 15.907 1.278 15.901 1.871 15.53 2.233 L 8.874 8.738 C 8.388 9.213 7.612 9.213 7.126 8.738 L 0.47 2.233 C 0.099 1.871 0.093 1.278 0.455 0.907 Z" fill="#000094" transform="matrix(-1, 0, 0, -1, 16.000132, 9.719188)"></path>
            </svg>
        );
    }

    const showUsers = (users) => {
        return (
            users.map((user) => {
                return (
                    <div className="credentials-flex-table credentials-cell" key={user.id}>
                        <div className="credentials-flex-row">{user.userName}</div>
                        <div className="credentials-flex-row">{user.role}</div>
                        <div className="credentials-flex-row credential-dropdown">
                            {showArrow(user)}
                        </div>
                        {showEdit(user)}
                    </div>
                );
            }));
    };


    
    return(
        <div className="credentials-wrapping"> 
            <div className="credentials-flex-table credentials-header">
                <div className="credentials-flex-row">{props.t('account.credentials.name')}</div>
                <div className="credentials-flex-row">{props.t('account.credentials.role')}</div>
                <div className="credentials-flex-row credential-dropdown"></div>
            </div>

            {showUsers(users)}

            {showAddUser()}
        </div>
         

    );
}

export default withTranslation () (ProviderCredentials);