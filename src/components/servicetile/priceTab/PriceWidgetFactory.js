import * as S from "./style";
import React from "react";


const PriceWidgetFactory = ({prices}) => {

    const DefaultPriceWidget = ({price }) =>  {
        return (
            <S.Price>
                <S.PriceName>{price.name}</S.PriceName>
                <S.PricePrice>{price.price}</S.PricePrice>
            </S.Price>
        );
    }
   
    return (prices.map((price, index)=> {
                    return <DefaultPriceWidget price={price} key={price.id}/>;
        }
    ));
}

export default PriceWidgetFactory;