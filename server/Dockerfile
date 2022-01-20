FROM node:16.13.1

WORKDIR /server

COPY package.json .

RUN npm install

RUN npm install -g node-dev

RUN mkdir ./UserData

CMD ["node-dev","server.js"]
