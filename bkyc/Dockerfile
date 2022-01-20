FROM node:16.13.1

WORKDIR /code

COPY package.json .

RUN yarn install

COPY . ./

CMD ["yarn","start"]
