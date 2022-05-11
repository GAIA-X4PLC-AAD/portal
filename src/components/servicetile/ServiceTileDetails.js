import { withTranslation } from "react-i18next";

const ServiceTileDetails = (props) => {

    return (
        <div className="service-tile-details">
            Placeholder - service tile details {props.serviceId}
        </div>
    );

}

export default withTranslation() (ServiceTileDetails);