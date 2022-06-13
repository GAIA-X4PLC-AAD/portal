FROM node:17-alpine3.14

ADD output/build build
# RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]