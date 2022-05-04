import React, {  useState } from "react";
import "./ProviderCredentials.css";
import axios from "axios";

const ProviderCredentialsEditor = (props) => {

    const isNewCredential = props.isNewCredential===undefined?false:props.isNewCredential;
    const isReadOnly = () => {
        if (isNewCredential) {
            return false;
        }
        return true;
    }

    const roles = [{name:"PPR_USER"}, {name:"PPR_EDITOR"}]

    const [loadUser, setLoadUser] = useState(props.loadUser);
    const [user, setUser] = useState (props.loadUser);
    const [readOnly, setReadOnly] = useState(isReadOnly());


    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type==="checkbox"?e.target.checked:e.target.value;
        setUser(user => ({...user, [key]: value}));
    }


    const onCancel = () => {
        setReadOnly(true);
        setUser(loadUser);
        if (typeof props.cancelCallback === "function") props.cancelCallback();
    }

    const updateUser= () => {
        setReadOnly(true);
        axios.put('http://localhost:8086/account/ppr/1/users/'+user.id, user).then(   (response) => {
            setLoadUser(response.data);
            setUser(response.data);
            props.updateUser(response.data);           
        },(error)=> {
          console.log(error);
          alert('ko');
        });     

    }

    const addNewUser= () => {
        setReadOnly(true);
        axios.post('http://localhost:8086/account/ppr/1/users', user).then(   (response) => {
            props.updateUser(response.data);           
        },(error)=> {
          console.log(error);
          alert('ko');
        });     

    }


    const onSave = () => {
        setReadOnly(true);
        if (isNewCredential) {
            addNewUser();
        } else {
            updateUser();
        }
    }


    const showRemove = () => {
        if (isNewCredential) return (<div className="credentials-edit-remove"> </div>);
        else return (
            <div className="credentials-edit-remove">
                Remove
            </div>
        );

    }

    const onDisabledSaveButton = (u) => {
        debugger;
        if (user === loadUser) return true;
        if (user?.firstName === undefined || user?.firstName ==='') return true;
        if (user?.lastName === undefined || user?.lastName ==='') return true;
        if (user?.email === undefined || user?.email ==='') return true;
        if (user?.role === undefined || user?.role ==='') return true;
        return false;
    }

    const showEditSave = (u) => {
        if (readOnly && !isNewCredential) {
            return (
                <React.Fragment>
                <div className="credentials-edit-blue">
                    <button onClick={()=>setReadOnly(false)}>Edit</button>
                </div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
             <div className="credentials-edit-blue">
                <button onClick={onCancel}>Cancel</button>
             </div>

            <div className="credentials-edit-blue">
                <button onClick={onSave} disabled={onDisabledSaveButton(u)}>Save</button>
            </div>
            </React.Fragment>

        );
    }


    const showButtons = (u) => {
        return (
            <React.Fragment>
                {showRemove()}
                {showEditSave(u)}
            </React.Fragment>
        );
    }

    const selectValue = (input) => {
        if(input === undefined || input === null) {
            return '';
        }
        return input;
    }

    const showRolesOptions = () => {
        return roles.map((role) =>{
            return (<option value={role.name} key={role.name}>{role.name}</option>);
        } );
    }
    //selected={role.name===user.role}

    return(
        <div className="credentials-edit-wrap">
            <div className="credentials-edit-column">
                <div >First name</div>
                <div >
                    <input type="text" name="firstName" value={user?.firstName} onChange={onFormChanged} disabled={readOnly}/>
                </div>
            </div>
            <div className="credentials-edit-column">
                <div >Last name</div>
                <div>
                    <input type="text" name="lastName" value={user?.lastName} onChange={onFormChanged} disabled={readOnly}/>
                </div>
            </div>
            <div className="credentials-edit-row">
                Email
            </div>
            <div className="credentials-edit-row">
                <input type="text" name="email" value={user?.email} onChange={onFormChanged} disabled={readOnly}/>
            </div>
            <div className="credentials-edit-row">
                Role
            </div>
            <div className="credentials-edit-row">
            <select name="role" onChange={onFormChanged} disabled={readOnly} value={selectValue(user?.role)}>
                <option value="" disabled></option>
                {showRolesOptions()}
            </select>
                
            </div>
            {showButtons(user)}
    </div>
    );
}

export default ProviderCredentialsEditor;