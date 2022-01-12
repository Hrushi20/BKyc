import { useState } from "react";
import { ethers } from "ethers";
import KycStorage from "../truffle/build/contracts/KycStorage.json"
import CryptoJs, { enc } from "crypto-js";

let provider;
const useMetamask = (cipherKey) => {

    const [isInstalled, setIsInstalled] = useState(false);
    const [address, setAddress] = useState(null);


    async function initMetamask() {
        console.log(window.ethereum);
        if (window.ethereum !== undefined) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider,"is the provider");
            const accounts = await provider.listAccounts();
            console.log(accounts);
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

async function sendKycToEthereum() {


    const signer = provider.getSigner();
    const networkId = Object.keys(KycStorage.networks)[0];
    const kycContract = new ethers.Contract(KycStorage.networks[networkId.toString()].address, KycStorage.abi, provider);
    const kycSigner = kycContract.connect(signer);
    // let d = await kycSigner.setData("98498","this is a ipfs hash","This is a cipher key");
    const userId = localStorage.getItem("userId");
    console.log("sendkycToeth ", cipherKey);
    const { ipfsHash } = await fetchHashedKycData(userId);
    console.log("sendkycToeth ", cipherKey);

    await getUserKyc(ipfsHash, cipherKey);
    // let blockchainResponse = await kycSigner.setData(userId,ipfsHash,cipherKey);
    // console.log(blockchainResponse);
    // await kycStoredOnBlockchainSuccess();
    // window.location.reload("http://localhost:3000/profile");
}

async function fetchHashedKycData(userId) {

    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/get-hashed-kyc`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();

    return res;
}

async function getUserKyc(ipfsHash, cipherKey) {
    const ipfsNode = window.IpfsHttpClient.create({ host: "localhost", port: 5001, protocol: 'http' });

    const encryptedKycString = await ipfsNode.object.get(ipfsHash);
    const dirtyKycString = new TextDecoder("utf-8").decode(encryptedKycString.Data).toString();
    // DirtyKycString is not Displaying character. TO remove error, using below regex (Dirty string displayed is ????);
    const cleanKycString = dirtyKycString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '')
    const decryptedKycString = CryptoJs.AES.decrypt(cleanKycString, cipherKey).toString(enc.Utf8);

    const decryptedKyc = JSON.parse(decryptedKycString);
    console.log(decryptedKyc);
}

async function kycStoredOnBlockchainSuccess() {
    const userId = localStorage.getItem("userId");

    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/kyc-stored-on-blockchain-success`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
            "Content-Type": "application/json"
        }
    })).json()

}


return {
    initMetamask,
    connectToMetamask,
    getKycFromEthereum,
    sendKycToEthereum,
    isInstalled,
    address
};
}

export default useMetamask;