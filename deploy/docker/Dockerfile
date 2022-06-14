FROM node:17-alpine3.14

ADD output/build build
# RUN npm install -g serve

EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]