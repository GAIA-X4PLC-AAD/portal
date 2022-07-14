FROM registry.gitlab.com/gaia-x/data-infrastructure-federation-services/por/demo/node:17-alpine3.14

ADD output/build build
RUN npm install -g serve@13.0.2

EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]