import * as S from "./ContactWidgetFactoryStyle";
import React from "react";
import { withTranslation } from "react-i18next";


const ContactWidgetFactory = ({contacts, t}) => {

    const DefaultContactWidget = ({contact }) =>  {
        return (
            <S.Contact>
                <S.ContactCategory>{t(`discovery.contactTypes.${contact.type}`)}</S.ContactCategory>
                <S.ContactValue>{contact.value}</S.ContactValue>
            </S.Contact>
        );
    }
   
    return (contacts.map((contact, index)=> {
            switch (contact.type) {    
                default: 
                    return <DefaultContactWidget contact={contact} key={index}/>;
            }
        }
    ));
}

export default withTranslation() (ContactWidgetFactory);