FROM node:18-alpine3.18
ARG ARG_APP_HOME=/home/node/app
ENV NODE_ENV=production

WORKDIR $ARG_APP_HOME

RUN npm install -g serve@14.2.0
COPY build ./
# Use user id instead of user name to allow Kubernetes to check for non-root user
USER 1000

EXPOSE 8080
CMD ["serve", "-s", "-l", "8080"]