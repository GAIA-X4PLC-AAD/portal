const path = require('path');

const { override } = require('customize-cra');

module.exports = override(
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

    // Return the modified Webpack config
    return config;
  }
);
