import * as S from "./ContactWidgetFactoryStyle";
import React from "react";

const ContactWidgetFactory = ({contacts}) => {


    function defaultCategory( contact ) {
        return (
            <S.Contact>
                <S.ContactCategory>{contact.type}</S.ContactCategory>
                <S.ContactValue>{contact.value}</S.ContactValue>
            </S.Contact>
        );
    }


    return (contacts.map((contact)=> {
            switch (contact.type) {    
                default: 
                    return ( defaultCategory(contact));
            }
        }
    ));
}

export default ContactWidgetFactory;