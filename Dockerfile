FROM node:10.15-slim

WORKDIR /usr/src/app

# bring in package*.jsons
RUN mkdir client && mkdir server
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/
COPY ./package*.json .

# install npm packages for both folders
RUN npm run install:everything

COPY . .

# env variables
COPY ./client/.env.dist ./client/.env
COPY ./server/.env.dist ./server/.env

# lowdb database
RUN mkdir -p ./server/data && touch ./server/data/db.json

RUN npm run build:client

CMD ["npm", "run", "start:server"]
