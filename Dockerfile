FROM node:18-alpine3.18
ARG ARG_APP_HOME=/home/node/app
ENV NODE_ENV=production

WORKDIR $ARG_APP_HOME

RUN npm install -g serve@13.0.2
COPY build ./
# Use user id instead of user name to allow Kubernetes to check for non-root user
USER 1000

EXPOSE 80
CMD ["serve", "-l", "80"]