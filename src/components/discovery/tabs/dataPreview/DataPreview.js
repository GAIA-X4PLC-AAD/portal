import React from "react";
import * as S from './style';
import PropTypes from 'prop-types';

const DataPreview = ({data, width, minHeight, shouldShowDetailsButton = true, margin = '0'}) => {

    const showDetailsButton = ()=> {
        if (!data.onDetailsClick) return null;
        return (<S.Button onClick={data.onDetailsClick}>Details</S.Button>);
    }

    const showLogo = () => {
        if (!data.img_logo_url) return null;
        return (<S.Logo src={data.img_logo_url} alt='Logo image'/>)
    }

    const calcSizeWithLogo = () => {
        if(!data.img_logo_url) return '100%';
        return 'calc(100% - 60px)';
    }

    return (
        <S.Preview width={width} minHeight={minHeight} margin={margin}>
            <S.PreviewImage src={data.img_preview_url} alt='preview image'/>
            <S.Columns>
                {showLogo()}
                <S.Rows width={calcSizeWithLogo}>
                    <S.Headline>{data.headline}</S.Headline>
                    <S.Subline>{data.subline}</S.Subline>
                </S.Rows>
            </S.Columns>
            <S.Description>{data.description}</S.Description>
            {shouldShowDetailsButton ? showDetailsButton() : <></>}
        </S.Preview>

    );

}

DataPreview.propTypes = {
    data: PropTypes.object,
    width: PropTypes.string,
    minHeight: PropTypes.string,
    shouldShowDetailsButton: PropTypes.bool,
    margin: PropTypes.string,
}

export default DataPreview;