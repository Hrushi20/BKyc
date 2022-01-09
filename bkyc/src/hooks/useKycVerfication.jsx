import { useState } from 'react';


const useKycVerification = () =>{
    const [data,setData]  = useState();

    async function fetchAllUnverifiedKycs(){
        let data = await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/get-unverified-kycs`)).json();

        setData(data["kycs"]);
    }

    async function kycVerified(index){

        
        // const data = data.filter((d,i) => i === index)[0];
        console.log("Verifying " + index + "...");
        // let res = await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/store-kyc-on-ipfs`,{
        //     method:"POST",
        //     body: data
        // })).json();

        // some ui rendering...
    }

    async function kycRejected(index){
        console.log("Rejecting " + index + "...");
    }

    return {
        fetchAllUnverifiedKycs,
        kycVerified,
        kycRejected,
        data
    }
};

export default useKycVerification;