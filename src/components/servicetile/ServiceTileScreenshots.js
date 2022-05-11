import { withTranslation } from "react-i18next";

const ServiceTileScreenshots = (props) => {

    return (
        <div className="service-tile-screenshots">
            Placeholder - Screenshots  {props.serviceId}
        </div>
    );

}

export default withTranslation() (ServiceTileScreenshots);