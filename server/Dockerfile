FROM node:16.13.1

WORKDIR /server

COPY package.json .

RUN npm install

COPY . ./

RUN mkdir ./UserData

CMD ["node","server.js"]
