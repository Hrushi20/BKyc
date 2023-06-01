#### Note-
**Hackathon**: [Ctrl Alt Debt](https://ctrl-alt-debt.hackerearth.com/#overview) <br>
**Team Name**: [Nubz_squad_](https://ctrl-alt-debt.hackerearth.com/challenges/hackathon/ctrl-alt-debt/dashboard/02041f8/team/) <br>
**Result**: **Top 25** team <br>

#### Teamates-
* [Hrushikesh Rao](https://github.com/hrushi20)
* [Saimahesh](https://github.com/saimaheshtaduri)
* [Bilal Aamer](https://github.com/bilal-aamer)


# BKyc
<hr>

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)


<img src="./bkyc/src/assets/logo.svg" style="display: block;margin-left: auto;margin-right: auto;height:250px;width:250px"/>

Kyc in today's generation is the most important document for verification & authentication of user's identity.
Bkyc gives users full control of  kycs. By providing software as a service Bkyc simplifies 
onboarding and verification of user kyc using the ethereum blockchain. Kyc is encrypted using
AES-256 symmetric encryption and stored on IPFS (distributed Storage System). The cipher key is not stored 
on the server and is sent to the client due to which there cannot be leakage of kyc data of the users.

## Architecture
<hr>

[//]: # (Architecture image will be added here)

<img src="./bkyc-arch-diagram.PNG">

## System requirments
<hr/>

- Docker
- Node v > 12.13.0  (LTS)
- Metamask (wallet to connect to blockchain)


## Running the project
<hr>

We have made developers life easier by adding docker to our project. With the help of a single command
user can build and run our entire project hazzel free.

### Steps to run our project-

#### Clone the project-
```
    git clone https://github.com/Hrushi20/BKyc.git
```
#### Install truffle globally using npm-
```
    npm install -g truffle
```
#### Open truffle folder in cloned directory and run-
```
    cd truffle
    truffle build
```

#### Start docker containers using-
```
    docker-compose up -d  
```
The above command downloads the required packages and starts all the containers in the background.
After install all the dependencies the resulting log is displayed.

```
    Creating ganache       ... done
    Creating mongo         ... done
    Creating mongo-express ... done
    Creating frontend      ... done
    Creating ipfs          ... done
    Creating backend       ... done
```
The project is up and running. 

>NOTE: This may take a few minutes as it builds all dependency containers of the system.

#### In the truffle folder deploy smart contract to ganache using -
```
    cd truffle
    truffle deploy
```

After deploying the smart contract open the website http://localhost:3000

### Ganache Private keys-
To store the data on the ethereum blockchain, we need ethers. We are using ganache as 
our local blockchain and metamask as wallet to connect to ganache. Ganache provides 
100 ethers each for 10 accounts. We can use ganache ethers to pay for storing the data on local blockchain.

```
docker logs ganache
```

On scrolling you can find the private keys for your local blockchain. 

<img src="./ganache-keys.png" />

 >NOTE: The private keys may not be the same as displayed above

### Metamask-
Metamask wallet is used to connect to the ganache. Install metamask web extension for your browser.
Create a metamask account, and you are good to go.

Follow the steps in the below url to connect metamask with ganache.

The <b>RPC URL</b> used in this project is <b> `http://127.0.0.1:7545`</b>
Add this RPC URL in metamask.

https://trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask.html

## Ports being used in the project-
<hr/>

| Port No. | Application   |
|----------|---------------|
| 3000     | Frontend      |
 | 8080     | Backend       |
| 7545     | Ganache       |
| 5001     | Ipfs          |
| 27017    | Mongodb       |
| 8081     | mongo-express |

### Video Link
<hr/>
The entire working of the application is available on YouTube. 
https://youtu.be/mmYmcLOrsnY

### Development tools
<hr/>

#### [Ipfs Desktop](https://docs.ipfs.tech/install/ipfs-desktop/#install-the-ipfs-desktop-app)

Ipfs desktop can be used to view the encrypted kyc data on ipfs network. Connect the ipfs application to the software. 

## Roadmap-
<hr/>
Although our solution is efficient, there's a lot more we wish to incorporate to expand bKYC, this includes:

- A robust and even more secure system
- A much more elegant UI/UX
- Improved AI models that aims to automate the validation process hence removing the human intervention in the process
- Updating user Kyc data on the blockchain.

