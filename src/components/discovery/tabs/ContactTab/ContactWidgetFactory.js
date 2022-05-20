import * as S from "./ContactWidgetFactoryStyle";
import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';


const ContactWidgetFactory = ({data, t}) => {

    const contacts = data || [];

    const DefaultContactWidget = ({contact }) =>  {
        return (
            <S.Contact>
                <S.ContactCategory>{t(`discovery.contactTypes.${contact.type}`)}</S.ContactCategory>
                <S.ContactValue>{contact.value}</S.ContactValue>
            </S.Contact>
        );
    }

    DefaultContactWidget.propTypes = {
        contact : PropTypes.object
    }
   

    const showContacts = () => {
        console.log(contacts);
        return (
            contacts.map((contact, index)=> {
                switch (contact.type) {    
                    default: 
                        return <DefaultContactWidget contact={contact} key={index}/>;
                }
            }));
    }


    return (
        <S.ContactsContainer>
            {showContacts()}
        </S.ContactsContainer>
        
    );
}

ContactWidgetFactory.propTypes = {
    data: PropTypes.array,
    t: PropTypes.func,
}

export default withTranslation() (ContactWidgetFactory);