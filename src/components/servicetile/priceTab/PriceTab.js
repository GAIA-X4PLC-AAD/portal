import { withTranslation } from "react-i18next";
import PriceWidgetFactory from "./PriceWidgetFactory";
import { PricesContainer, BookButton} from "./style";


const PriceTab = ( { serviceId, t} ) => {

    const data = [{id: 1, name:'Price for service 1', price:'100€ / month'}, 
                  {id: 2, name:'Price for service 2', price:'200€ / month'}, 
                  {id: 3, name:'Price for service 3', price:'300€ / month'}, 
                  {id: 4, name:'Price for service 4', price:'400€ / month'}, 
                  {id: 5, name:'Price for service 5', price:'500€ / month'}];


    return (
        <div>
            <PricesContainer>
                <PriceWidgetFactory prices={data}/>
            </PricesContainer>
                <BookButton>{t('service-tile.bookButton')}</BookButton>
        </div>

    );
};

export default withTranslation() (PriceTab);