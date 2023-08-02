import * as S from "./style";
import React from "react";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const PriceWidgetFactory = (showButton) =>{
    
    const {t} = useTranslation();
    const PriceWidget = ({data}) => {

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
                    {showButton?<S.BookButton>{t('service-tile.bookButton')}</S.BookButton>:null}
            </S.Prices>
        );
    }; 
    PriceWidget.propTypes = {
        data: PropTypes.array
    }
    return PriceWidget;
}

PriceWidgetFactory.propTypes = {
    showButton: PropTypes.bool
}

export default PriceWidgetFactory;
