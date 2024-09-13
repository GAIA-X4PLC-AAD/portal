# Portal Frontend
This repository contains an implementation of a Portal that is based on a reference implementation of a Gaia-X Portal.

The reference implementation has been cloned from the following repository: https://gitlab.eclipse.org/eclipse/xfsc/por/portal-frontend

## Development
In order to run Portal Frontend locally, the following requirements should be satisfied:
  - API Gateway for deployed microservices should be accessible
  - npm installed locally (tested with version 9.7.2)
  - nodejs installed locally (tested with version v18.16.0)

To run application, execute following statements:

~~~~
$ npm install
$ npm run start
~~~~

Now application can be accessed in browser via URL http://localhost:3000.

## Keycloak Configuration
The portal uses a Keycloak of the connected GXFS Federated Catalogue as a IAM. The right keycloak set up can be found [here](https://gitlab.com/gaia-x/data-infrastructure-federation-services/cat/fc-service/-/tree/main/docker#keycloak-setup)


