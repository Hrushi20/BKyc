FROM node:16.13.1
RUN npm install -g ipfs 
RUN jsipfs init
RUN jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
RUN jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"
RUN jsipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/5050
RUN jsipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
#RUN chmod +x ./test.sh
#RUN ./test.sh
CMD ["jsipfs","daemon"]
