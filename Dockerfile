FROM node:18-alpine3.18
ARG ARG_APP_HOME=/home/app
ARG ARG_RUN_USER=app

# Copy required resources and set appropriate permissions
COPY build ${ARG_APP_HOME}
RUN npm install -g serve@14.2.0

# Use user id instead of user name to allow Kubernetes to check for non-root user
USER 1000

WORKDIR ${ARG_APP_HOME}

EXPOSE 80
CMD ["serve", "-p", "80"]