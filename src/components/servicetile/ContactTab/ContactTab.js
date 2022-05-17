import axios from "axios";
import ContactWidgetFactory from "./ContactWidgetFactory";
import { ContactsContainer } from "./ContactWidgetFactoryStyle";
import configData from "../../../config/config.json";
import { useEffect, useState } from "react";

const ContactTab = ( { serviceId } ) => {

    const [data, setData] = useState([]);

    useEffect (()=>{
            axios.get(configData.EDGE_API_URI + `/discovery/services/${serviceId}/contacts/`).then((response) => {setData(response.data)});
        }
    , []);


/*
    const data = [{type:'tech_phone', value:'123455667'}, 
        {type:'tech_phone', value:'123455667'},
        {type:'tech_phone', value:'123455667'},
        {type:'tech_phone', value:'123455667'}];
*/

    return (
        <ContactsContainer>
            <ContactWidgetFactory contacts={data}/>
        </ContactsContainer>
    );
};

export default ContactTab;