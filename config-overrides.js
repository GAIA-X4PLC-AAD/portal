const CopyWebpackPlugin = require('copy-webpack-plugin');
const { useBabelRc, override } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { DefinePlugin } = require('webpack');
const cesiumBaseUrl = 'vcmap-core';
const webpack = require('webpack');

module.exports = override(
  useBabelRc(),
  (config, env) => {
    config.resolve.fallback = {
      url: require.resolve('url'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      new NodePolyfillPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/@vcmap-cesium/engine/Build/Workers', to: `${cesiumBaseUrl}/Workers` },
          { from: 'node_modules/@vcmap-cesium/engine/Build/ThirdParty', to: `${cesiumBaseUrl}/ThirdParty` },
          { from: 'node_modules/@vcmap-cesium/engine/Source/Assets', to: `${cesiumBaseUrl}/Assets` },
        ],
      }),
      new DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
      }),
    );

    config.devServer = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    };

    return config;
  }
);
