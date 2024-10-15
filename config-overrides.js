const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { useBabelRc, override } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { DefinePlugin } = require('webpack');
const cesiumBaseUrl = 'vcmap-core';
const webpack = require('webpack');

module.exports = override(
  // Use Babel config from .babelrc
  useBabelRc(),

  // Add Webpack alias for Keycloak configuration based on the environment
  (config) => {
    const isProduction = process.env.NODE_ENV === 'production';

    // Define the path to the correct keycloak-config based on the environment
    config.resolve.alias['keycloak-config'] = path.resolve(
      __dirname,
      isProduction
        ? 'src/keycloak-config.prod.json'   // Production environment
        : 'src/keycloak-config.json'        // Development environment
    );

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
          { from: 'node_modules/@vcmap-cesium/engine/Build/Workers', to: `resources/details/${cesiumBaseUrl}/Workers` },
          { from: 'node_modules/@vcmap-cesium/engine/Build/ThirdParty', to: `resources/details/${cesiumBaseUrl}/ThirdParty` },
          { from: 'node_modules/@vcmap-cesium/engine/Source/Assets', to: `resources/details/${cesiumBaseUrl}/Assets` },
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

    // Return the modified Webpack config
    return config;
  }
);
