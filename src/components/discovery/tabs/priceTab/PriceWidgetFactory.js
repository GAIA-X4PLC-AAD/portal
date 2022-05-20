import * as S from "./style";
import React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";

const PriceWidgetFactory = ({data, t}) => {

    const prices = data || [];

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
   
    const showPrices = () => {
        return (prices.map((price, index)=> {
                        return <DefaultPriceWidget price={price} key={price.id}/>;
            }
        ));
    }

    return (
        <S.Prices>
            <S.PricesContainer>
                {showPrices()}
            </S.PricesContainer>
                <S.BookButton>{t('service-tile.bookButton')}</S.BookButton>
        </S.Prices>
    );
};
PriceWidgetFactory.propTypes = {
    data: PropTypes.array,
    t: PropTypes.func
}

export default withTranslation()  (PriceWidgetFactory);
