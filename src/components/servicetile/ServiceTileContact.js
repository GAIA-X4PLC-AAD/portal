import { withTranslation } from "react-i18next";
import ContactTab from "./ContactTab/ContactTab";


const ServiceTileContact = (props) => {


    return (
            <ContactTab serviceId={props.serviceId}/>
    );

}

export default withTranslation() (ServiceTileContact);