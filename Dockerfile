FROM node:16.13.1
FROM trufflesuite/ganache-cli

RUN npm install -g ganache-cli

CMD ["ganache-cli"]