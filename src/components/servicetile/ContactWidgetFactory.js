import * as S from "./ContactWidgetFactoryStyle";
import React from "react";


const ContactWidgetFactory = ({contacts}) => {

    const DefaultContact = ({contact }) =>  {
        return (
            <S.Contact>
                <S.ContactCategory>{contact.type}</S.ContactCategory>
                <S.ContactValue>{contact.value}</S.ContactValue>
            </S.Contact>
        );
    }
   
    return (contacts.map((contact, index)=> {
            switch (contact.type) {    
                default: 
                    return <DefaultContact contact={contact} key={index}/>;
            }
        }
    ));
}

export default ContactWidgetFactory;