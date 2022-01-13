FROM node:16.13.1

WORKDIR /code

COPY package.json .

RUN yarn install

RUN yarn global add truffle

COPY . ./

WORKDIR /code/src/truffle

RUN truffle build 

# RUN truffle deploy

WORKDIR /code

CMD ["yarn","start"]
