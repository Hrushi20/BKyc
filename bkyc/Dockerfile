FROM node:16.13.1

WORKDIR /code

COPY package.json .

RUN npm install --save --legacy-peer-deps

RUN npm install -g truffle 

COPY . ./

WORKDIR /code/src/truffle

RUN truffle build 

# RUN truffle deploy

WORKDIR /code

CMD ["npm","start"]
