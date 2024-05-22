const path = require('path');

module.exports = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  },
  resolve: {
    alias: {
      '': path.resolve(__dirname, 'src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: { 'url': require.resolve('url/') }
  }
};
