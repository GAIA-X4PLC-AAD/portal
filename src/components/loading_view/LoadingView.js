import { useResource } from '@axios-use/react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { Center, Style, AnimatedVisibility, CircularLoader } from '../../common/styles';

function LoadingView({ url, successView, params, headers }) {
  const [{ data, error, isLoading }] = useResource(() => ({ url: url, headers: headers }), []);

  useEffect(() => {
    // console.log(`LoadingView.useEffect, isLoading: ${isLoading}`)
  }, [isLoading, error, data]);

  let isError = error != undefined;

  return (
    <>
      <Center>
        <Style zIndex={-1}>
          <AnimatedVisibility visible={isLoading} data-tag='animated-visibility-loader'>
            <CircularLoader />
          </AnimatedVisibility>
        </Style>

        <Style zIndex={-1}>
          <AnimatedVisibility visible={isError} data-tag='animated-visibility-error'>
            <p>Error Loading Content!</p>
          </AnimatedVisibility>
        </Style>

        <AnimatedVisibility visible={!isLoading && error == undefined && !(data === undefined)} data-tag='animated-visibility-success'>
          {successView({ data: data, params: params })}
        </AnimatedVisibility>
      </Center>
    </>
  );

}

LoadingView.propTypes = {
  url: PropTypes.string.isRequired,
  successView: PropTypes.func.isRequired,
  params: PropTypes.object,
  headers: PropTypes.object,
}

export default LoadingView
