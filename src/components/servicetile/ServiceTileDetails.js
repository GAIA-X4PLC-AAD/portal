import { withTranslation } from "react-i18next";
import DescriptionTab from "./DescriptionTab/DescriptionTab";

const ServiceTileDetails = (props) => {

    return (
        <div className="service-tile-details">
            {/* Placeholder - service tile details {props.serviceId} */}
            <DescriptionTab serviceId={props.serviceId}/>
        </div>
    );

}

export default withTranslation() (ServiceTileDetails);