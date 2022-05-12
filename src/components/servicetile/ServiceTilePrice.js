import { withTranslation } from "react-i18next";
import PriceTab from "./priceTab/PriceTab";

const ServiceTilePrice = (props) => {

    return (
        <div className="service-tile-price">
            <PriceTab serviceId={props.serviceId}/>
        </div>
    );

}

export default withTranslation() (ServiceTilePrice);