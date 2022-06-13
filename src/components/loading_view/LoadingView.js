
import React, { useState, useRef, useEffect } from 'react';

import * as S from './style';
import PropTypes from 'prop-types';

import { useResource } from "@axios-use/react";

import { Center, Style } from '../../common/styles';


function LoadingView({ url, successView, params }) {
    const [{ data, error, isLoading }] = useResource(() => ({ url: url }), []);

    useEffect(() => {
        console.log(`LoadingView.useEffect, isLoading: ${isLoading}`)
    }, [isLoading, error, data]);

    let isError = error != undefined;

    return (
        <>
            <Center>
                <Style zIndex={-1}>
                    <S.AnimatedVisibility visible={isLoading}>
                        <S.CircularLoader />
                    </S.AnimatedVisibility>
                </Style>

                <Style zIndex={-1}>
                    <S.AnimatedVisibility visible={isError}>
                        <p>Error Loading Content!</p>
                    </S.AnimatedVisibility>
                </Style>

                <S.AnimatedVisibility visible={!isLoading && error == undefined && !(data === undefined)}>
                    {successView({ data: data, params: params })}
                </S.AnimatedVisibility>
            </Center>
        </>
    );

}

LoadingView.propTypes = {
    url: PropTypes.string.isRequired,
    successView: PropTypes.func.isRequired,
    params: PropTypes.object,
}

export default LoadingView