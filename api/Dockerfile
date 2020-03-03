FROM node:13.3.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn --production

COPY . /usr/src/app
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "server" ]