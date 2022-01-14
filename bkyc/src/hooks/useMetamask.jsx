import { useState } from "react";
import { ethers } from "ethers";
import KycStorage from "../truffle/build/contracts/KycStorage.json"
import CryptoJs, { enc } from "crypto-js";

let provider;
const useMetamask = (cipherKey) => {

    const [isInstalled, setIsInstalled] = useState(false);
    const [address, setAddress] = useState(null);
    const [userKyc,setUserKyc] = useState(null);


    async function initMetamask() {
        if (window.ethereum !== undefined) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();

            window.ethereum.on('accountsChanged',(accounts) => {
                setAddress(address[0]);
            })

            if(accounts.length > 0){
                setAddress(accounts[0]);
            }
            setIsInstalled(true);
            return;
        }
        setIsInstalled(false);
    }


    async function connectToMetamask() {

        try {
                const userAddress = await provider.send("eth_requestAccounts", []);
                setAddress(userAddress[0]);
        } catch (err) {
            console.log('User didn\'t accept metamask connection ', err);
            // User didn't accept account for metamask....
        }
    }

async function getKycFromEthereum() {
    const networkId = Object.keys(KycStorage.networks)[0];
    const kycContract = new ethers.Contract(KycStorage.networks[networkId.toString()].address, KycStorage.abi, provider);

    const userId = localStorage.getItem("userId");
    let blockchainResponse = await kycContract.getData(userId);
    console.log(blockchainResponse);
    return blockchainResponse;
}

async function sendKycToEthereum(cipherKey) {

    const signer = provider.getSigner();
    const networkId = Object.keys(KycStorage.networks)[0];
    const kycContract = new ethers.Contract(KycStorage.networks[networkId.toString()].address, KycStorage.abi, provider);
    const kycSigner = kycContract.connect(signer);
    // let d = await kycSigner.setData("98498","this is a ipfs hash","This is a cipher key");
    const userId = localStorage.getItem("userId");
    const ipfsHash = localStorage.getItem("ipfsHash");
    let blockchainResponse = await kycSigner.setData(userId,ipfsHash,cipherKey);
    localStorage.removeItem("ipfsHash");
    console.log(blockchainResponse);
    await kycStoredOnBlockchainSuccess();
    window.location.reload("http://localhost:3000/profile");
}

async function fetchHashedKycData(userId) {

    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/get-hashed-kyc/${userId}`)).json();
    return res;
}

async function decodeUserKyc(cipherKey) {
    const ipfsNode = window.IpfsHttpClient.create({ host: "localhost", port: 5001, protocol: 'http' });
    const { ipfsHash } = await fetchHashedKycData(localStorage.getItem("userId"));
    localStorage.setItem("ipfsHash",ipfsHash);
    console.log(ipfsHash,cipherKey,localStorage.getItem("userId"));
    const encryptedKycString = await ipfsNode.object.get(ipfsHash);
    const dirtyKycString = new TextDecoder("utf-8").decode(encryptedKycString.Data).toString();
    // DirtyKycString is not Displaying character. TO remove error, using below regex (Dirty string displayed is ????);
    const cleanKycString = dirtyKycString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '')
    const decryptedKycString = CryptoJs.AES.decrypt(cleanKycString, cipherKey).toString(enc.Utf8);
    const decryptedKyc = JSON.parse(decryptedKycString);
    setUserKyc(decryptedKyc);
}

async function kycStoredOnBlockchainSuccess() {
    const userId = localStorage.getItem("userId");

    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/kyc-stored-on-blockchain-success/${userId}`)).json()
}


return {
    initMetamask,
    connectToMetamask,
    getKycFromEthereum,
    sendKycToEthereum,
    isInstalled,
    address,
    userKyc,
    decodeUserKyc
};
}

export default useMetamask;