import React from "react";
import * as S from './style';
import PropTypes from 'prop-types';

const DataPreview = ({data}) => {

    const showDetailsButton = ()=> {
        if (!data.onDetailsClick) return null;
        return (<S.Button onClick={data.onDetailsClick}>Details</S.Button>);
    }

    const showLogo = () => {
        if (!data.img_logo_url) return null;
        return (<S.Logo src={data.img_logo_url} alt='Logo image'/>)
    }


    return (
        <S.Preview>
            <S.PreviewImage src={data.img_preview_url} alt='preview image'/>
            <S.Columns>
                {showLogo()}
                <S.Rows>
                    <S.Headline>{data.headline}</S.Headline>
                    <S.Subline>{data.subline}</S.Subline>
                </S.Rows>
            </S.Columns>
            <S.Description>{data.description}</S.Description>
            {showDetailsButton()}
        </S.Preview>

    );

}

DataPreview.propTypes = {
    data: PropTypes.object,
}

export default DataPreview;