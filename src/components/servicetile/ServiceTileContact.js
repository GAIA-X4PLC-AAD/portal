import { withTranslation } from "react-i18next";

const ServiceTileContact = (props) => {

    return (
        <div className="service-tile-contact">
            Placeholder - Contact  {props.serviceId}
        </div>
    );

}

export default withTranslation() (ServiceTileContact);