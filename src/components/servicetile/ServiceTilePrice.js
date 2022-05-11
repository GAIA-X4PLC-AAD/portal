import { withTranslation } from "react-i18next";

const ServiceTilePrice = (props) => {

    return (
        <div className="service-tile-price">
            Placeholder - price  {props.serviceId}
        </div>
    );

}

export default withTranslation() (ServiceTilePrice);