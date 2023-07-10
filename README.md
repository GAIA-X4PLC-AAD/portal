# Portal Frontend
This repository contains an implementation of a Portal that is based on a reference implementation of a Gaia-X Portal.

The reference implementation has been cloned from the following repository: https://gitlab.eclipse.org/eclipse/xfsc/por/portal-frontend

## Development
In order to run Portal Frontend locally, the following requirements should be satisfied:
  - API Gateway for deployed microservices should be accessible
  - npm installed locally (tested with version 8.11.0)
  - nodejs installed locally (tested with version v17.9.1)

To run application, execute following statements:

~~~~
$ npm install
$ REACT_APP_EDGE_API_URI=https://portal.gxfs.dev/api npm start
~~~~

Here REACT_APP_EDGE_API_URI - environment variable pointing to API Gateway.

Now application can be accessed in browser via URL http://localhost:3000.


