import { useState } from "react";
import { ethers } from "ethers";
import KycStorage from "../truffle/build/contracts/KycStorage.json"

let provider;
const useMetamask = () => {

    const [isConnected,setIsConnected] = useState(false);

    const [isInstalled,setIsInstalled] = useState(true);

    async function initMetamask(){
        
        provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // // setProvider(provider);

        // const kycContract = new ethers.Contract(KycStorage.networks["5777"].address,KycStorage.abi,provider);

        // // setKycContract(kycContract);

        // let data = await kycContract.getData("98498");

        // const kycSigner = kycContract.connect(signer);

        // let d = await kycSigner.setData("98498","this is a ipfs hash","This is a cipher key");

        // console.log(d);

        // console.log(kycSigner);

    }


    async function connectToMetamask(){

        if(provider == undefined) {
            setIsInstalled(false);
        }else {
            setIsInstalled(true);
            try{
                await provider.send("eth_requestAccounts", []);
                // await signer.getAddress();
                setIsConnected(true);
            }catch(err){
                console.log('Error: ', err);
                // User didn't accept account for metamask....
            }
        }
    }

    async function getKycFromEthereum(){
        const kycContract = new ethers.Contract(KycStorage.networks["5777"].address,KycStorage.abi,provider);

        const userId = localStorage.getItem("userId");
        let blockchainResponse = await kycContract.getData(userId);
        console.log(blockchainResponse);
        return blockchainResponse;
    }

    async function sendKycToEthereum(){
        
        const signer = provider.getSigner();
        const kycContract = new ethers.Contract(KycStorage.networks["5777"].address,KycStorage.abi,provider);
        const kycSigner = kycContract.connect(signer);
        // let d = await kycSigner.setData("98498","this is a ipfs hash","This is a cipher key");
        const userId = localStorage.getItem("userId");
        const { ipfsHash,cipherKey  } = await fetchHashedKycData(userId);
        let blockchainResponse = await kycSigner.setData(userId,ipfsHash,cipherKey);
        console.log(blockchainResponse);
        await kycStoredOnBlockchainSuccess();
        window.location.reload("http://localhost:3000/profile");
    }

    async function fetchHashedKycData(userId){

        const res = await(await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/get-hashed-kyc`,{
            method:"POST",
            body:JSON.stringify({ userId }),
            headers:{
                "Content-Type":"application/json"
            }
        })).json();

        return res;
    }

    async function kycStoredOnBlockchainSuccess(){
        const userId = localStorage.getItem("userId");

        const res = await(await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/kyc-stored-on-blockchain-success`,{
            method:"POST",
            body:JSON.stringify({ userId }),
            headers:{
                "Content-Type":"application/json"
            }
        })).json()

    }


    return {
        initMetamask,
        connectToMetamask,
        getKycFromEthereum,
        sendKycToEthereum,
        isInstalled,
        isConnected
    };
}

export default useMetamask;