import ContactWidgetFactory from "./ContactWidgetFactory";
import {ContactsContainer} from "./ContactWidgetFactoryStyle";

const ContactDetails = () => {

    const data = [{type:'tech_phone', value:'123455667'}, {type:'tech_phone', value:'123455667'}, {type:'tech_phone', value:'123455667'} ,{type:'tech_phone', value:'123455667'}];

    return (
            <ContactsContainer>
                <ContactWidgetFactory contacts={data}/>
            </ContactsContainer>
    );
}

export default ContactDetails;