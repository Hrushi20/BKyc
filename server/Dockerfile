FROM node:16.13.1

WORKDIR /server

COPY package.json .

RUN yarn install

COPY . ./

RUN mkdir ./UserData

CMD ["yarn","server.js"]
