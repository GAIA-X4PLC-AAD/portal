import { withTranslation } from "react-i18next";
import React from "react";
import PriceWidgetFactory from "./PriceWidgetFactory";
import { PricesContainer, BookButton, Prices} from "./style";
import PropTypes from 'prop-types';

const PriceTab = ( { id, t} ) => {

    const data = [{id: 1, name:'Price for service 1', price:'100€ / month'}, 
                  {id: 2, name:'Price for service 2', price:'200€ / month'}, 
                  {id: 3, name:'Price for service 3', price:'300€ / month'}, 
                  {id: 4, name:'Price for service 4', price:'400€ / month'}, 
                  {id: 5, name:'Price for service 5', price:'500€ / month'}];


    return (
        <Prices>
            <PricesContainer>
                <PriceWidgetFactory prices={data}/>
            </PricesContainer>
                <BookButton>{t('service-tile.bookButton')}</BookButton>
        </Prices>

    );
};

PriceTab.propTypes = {
    id: PropTypes.string,
    t: PropTypes.func,
};

export default withTranslation() (PriceTab);