import React, {useState} from "react";
import {withTranslation} from 'react-i18next';
import './RegisterUser.css';

const RegisterUser = (props) => {
    const RegType = {
      USER: "USER",
      ORGANIZATION: "ORGANIZATION"
    }
    // jb: defaults needed?
    //const inputDefault = {
    //  firstName: '',
    //  lastName: '',
    //  registerType: RegType.USER
    //}
    //const [input, setInput] = useState(inputDefault);

    const [input, setInput] = useState({});
    const [formIndex, setFormIndex] = useState(0);

    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [key]: value}))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        alert(Object.entries(input).map(entry => `${entry[0]}: ${entry[1]}\n` ));
    }

    const nextFormPage = () => {
        setFormIndex(formIndex + 1);
    };

    const prevFormPage = () => {
        setFormIndex(formIndex - 1);
    };

    const formUserOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserOne")}</p>
            </div>
            <div className="registerInputs">
            <form onSubmit={onFormSubmit}>
                <input id="regUser" type="radio" name="registerType" value="User" onChange={onFormChanged} />
                <label htmlFor="regUser">{props.t("form.user")}</label>
                <br />
                <input id="regOrganization" type="radio" name="registerType" value="Organization" onChange={onFormChanged} />
                <label htmlFor="regOrganization">{props.t("form.organization")}</label>
                <br />
                <button onClick={nextFormPage}>{props.t("form.continue")}</button>
            </form>
            </div>
        </div>
        )
    };

    const formUserTwo = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formUserTwo")}</p>
            </div>
            <div className="registerInputs">
            <form onSubmit={onFormSubmit}>
                <label>{props.t("form.lFirstName")}:
                    <input type="text" name="firstName" value={input.firstName || ""} onChange={onFormChanged} />
                </label>
                <label>{props.t("form.lLastName")}:
                    <input type="text" name="lastName" value={input.lastName || ""} onChange={onFormChanged} />
                </label>
                <br />
                <label>{props.t("form.lEmail")}:
                    <input type="text" name="email" value={input.email || ""} onChange={onFormChanged} />
                </label>
                <label>{props.t("form.lPhone")}:
                    <input type="text" name="phone" value={input.phone || ""} onChange={onFormChanged} />
                </label>
                <br />
                <label>{props.t("form.lStreetnNumber")}:
                    <input type="text" name="streetnNumber" value={input.streetnNumber || ""} onChange={onFormChanged} />
                </label>
                <label>{props.t("form.lZIPnCity")}:
                    <input type="text" name="zipncity" value={input.zipncity || ""} onChange={onFormChanged} />
                </label>
                <br />
                <label>{props.t("form.lCountry")}:
                    <input type="text" name="country" value={input.country || ""} onChange={onFormChanged} />
                </label>
                <br /><br />
                <button onClick={prevFormPage}>{props.t("form.prev")}</button>
                <button onClick={onFormSubmit}>{props.t("form.regViaDID")}</button>
                <button onClick={nextFormPage}>{props.t("form.send")}</button>
            </form>
            </div>
        </div>
        )
    }

    const formUserThree = () => {
        return (
            <div className="RegisterUser">
                <div className="registerHelpText">
                    <h3>{props.t("form.formUserHeadline")}</h3>
                    <p>{props.t("form.formUserThree")}</p>
                </div>
                <div className="registerInputs">
                    <p>{props.t("form.almostDone")}</p>
                </div>
            </div>
        )
    }

    const formArray = [ formUserOne, formUserTwo, formUserThree ]

    return (
        //formUserOne()
        formArray[formIndex]()
    );

}

export default withTranslation()(RegisterUser);

