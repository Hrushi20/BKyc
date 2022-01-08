import { useState } from "react";
import { ethers } from "ethers";
import KycStorage from "../truffle/build/contracts/KycStorage.json"

const useMetamask = () => {

    const [] = useState();

    async function initMetamask(){
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const signer = provider.getSigner()
        console.log(signer);

        const kycContract = new ethers.Contract(KycStorage.networks["5777"].address,KycStorage.abi,provider);

        let data = await kycContract.getData("98498");

        const kycSigner = kycContract.connect(signer);

        let d = await kycSigner.setData("98498","this is a ipfs hash","This is a cipher key");

        console.log(d);

        // console.log(kycSigner);

    }

    return {
        initMetamask
    };
}

export default useMetamask;