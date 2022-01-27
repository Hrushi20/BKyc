FROM node:16.13.1

WORKDIR /code

COPY package.json .

RUN npm install --save --legacy-peer-deps
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

CMD ["npm","start"]
