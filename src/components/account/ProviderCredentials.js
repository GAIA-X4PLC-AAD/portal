import React, { useState } from "react";
import "./ProviderCredentials.css";

const ProviderCredentials = () => {
    const users = [{id: 1, name:'user1 name', role: 'user1 role', firstName: 'firstName1', lastName:'Lastname1', email:'email1@domain.com'},
                    {id: 2, name:'user2 name', role: 'user2 role', firstName: 'firstName2', lastName:'Lastname2', email:'email2@domain.com' },
                    {id: 3, name:'user3 name', role: 'user3 role', firstName: 'firstName3', lastName:'Lastname3', email:'email3@domain.com' },
                    {id: 4, name:'user4 name', role: 'user4 role', firstName: 'firstName4', lastName:'Lastname4', email:'email4@domain.com' }];

    const [user, setUser] = useState (null);

    const showButtons = (id) => {
        return (
            <React.Fragment>
                <div className="credentials-edit-remove">
                    Remove
                </div>
                <div className="credentials-edit-blue">
                    <button>Cancel</button>
                </div>
                <div className="credentials-edit-blue">
                    <button>Edit</button>
                </div>
            </React.Fragment>
        );
    }


    const showEdit = (userSelected) => {
        if (user === null || userSelected.id !== user.id) return null;
        return(
            <div className="credentials-edit-wrap">
                <div className="credentials-edit-column">
                    <div >First name</div>
                    <div >
                        <input type="text" value={user.firstName} disabled/>
                    </div>
                </div>
                <div className="credentials-edit-column">
                    <div >Last name</div>
                    <div>
                        <input type="text" value={user.lastName} disabled/>
                    </div>
                </div>
                <div className="credentials-edit-row">
                    Email
                </div>
                <div className="credentials-edit-row">
                    <input type="text" value={user.email} disabled/>
                </div>
                <div className="credentials-edit-row">
                    Role
                </div>
                <div className="credentials-edit-row">
                    <input type="text" value={user.role} disabled/>
                </div>
                {showButtons(user.id)}
        </div>

        );
    }


    const showArrow = (u) => {
        if (user === null || u.id !== user.id) {
            return (
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> setUser(u)}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.454512 0.907251C0.816397 0.53695 1.40995 0.530128 1.78025 0.892012L8 6.9704L14.2197 0.892012C14.59 0.530128 15.1836 0.53695 15.5455 0.907251C15.9074 1.27755 15.9005 1.8711 15.5302 2.23299L8.87367 8.73829C8.38794 9.21297 7.61206 9.21297 7.12633 8.73829L0.469751 2.23299C0.0994505 1.8711 0.092628 1.27755 0.454512 0.907251Z" fill="#000094"/>
                </svg>
            );
        }
        return (
            <svg viewBox="0.188 0.625 15.625 8.469" width="15.625" height="8.469" onClick={()=> setUser(null)}>
                <path fillRule="evenodd" clipRule="evenodd" d="M 0.455 0.907 C 0.816 0.537 1.41 0.53 1.78 0.892 L 8 6.97 L 14.22 0.892 C 14.59 0.53 15.184 0.537 15.546 0.907 C 15.907 1.278 15.901 1.871 15.53 2.233 L 8.874 8.738 C 8.388 9.213 7.612 9.213 7.126 8.738 L 0.47 2.233 C 0.099 1.871 0.093 1.278 0.455 0.907 Z" fill="#000094" transform="matrix(-1, 0, 0, -1, 16.000132, 9.719188)"></path>
            </svg>
        );
    }

    const showUsers = (users) => {
        return (
            users.map((user) => {
                return (
                    <div className="credentials-flex-table credentials-cell" key={user.id}>
                        <div className="credentials-flex-row">{user.name}</div>
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
                <div className="credentials-flex-row">Name</div>
                <div className="credentials-flex-row">Role</div>
                <div className="credentials-flex-row credential-dropdown"></div>
            </div>

            {showUsers(users)}

            <div className="credential-add-user-button">Add user</div>   
        </div>
         

    );
}

export default ProviderCredentials;