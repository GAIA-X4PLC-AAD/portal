import * as S from "./style";
import React from "react";
import PropTypes from 'prop-types';

const PriceWidgetFactory = ({prices}) => {

    const DefaultPriceWidget = ({price }) =>  {
        return (
            <S.Price>
                <S.PriceName>{price.name}</S.PriceName>
                <S.PricePrice>{price.price}</S.PricePrice>
            </S.Price>
        );
    }
    DefaultPriceWidget.propTypes = {
        price: PropTypes.object
    }
   
    return (prices.map((price, index)=> {
                    return <DefaultPriceWidget price={price} key={price.id}/>;
        }
    ));
}

PriceWidgetFactory.propTypes = {
    prices: PropTypes.array,
};
export default PriceWidgetFactory;