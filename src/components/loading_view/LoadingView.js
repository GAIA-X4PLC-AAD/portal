
import React, { useState, useRef, useEffect } from 'react';

import * as S from './style';
import PropTypes from 'prop-types';

import { useResource } from "@axios-use/react";


function LoadingView({ url, successView }) {
    const [{ data, error, isLoading }] = useResource(() => ({ url: url }), []);

    useEffect(() => {
        console.log(`LoadingView.useEffect, error: ${error}`)
      }, [isLoading]);

    return (
        <>
            <S.Center>
                <S.AnimatedVisibility visible={isLoading}>
                    <S.CircularLoader />
                </S.AnimatedVisibility>

                <S.AnimatedVisibility visible={error != undefined}>
                    <p>Error Loading Content!</p>
                </S.AnimatedVisibility>

                <S.AnimatedVisibility visible={!isLoading && error == undefined}>
                    {successView({ data: data })}
                </S.AnimatedVisibility>
            </S.Center>
        </>
    );

}

LoadingView.propTypes = {
    url: PropTypes.string.isRequired,
    successView: PropTypes.func.isRequired,
}

export default LoadingView