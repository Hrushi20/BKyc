import { useState } from 'react';


const useKycVerification = () =>{
    const [data,setData]  = useState();

    async function fetchAllUnverifiedKycs(){
        let data = await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/get-unverified-kycs`)).json();

        setData(data["kycs"]);
    }

    async function scheduleAMeet(index){
        const userData = data.filter((_,i) => i === index)[0];
        const userId = userData.userId;

        await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/schedule-a-meet/${userId}`)).json();

        console.log("Scheduling a meeet......");

    }


    async function kycVerified(index, email){
        
        const userData = data.filter((d,i) => i === index)[0];

        const uData = {
            userData,
            email
        }

        let res = await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/store-kyc-on-ipfs`,{
            method:"POST",
            body: JSON.stringify(uData),
            headers:{
                "Content-Type":"application/json"
            }
        })).json();

        console.log("Response:", res);
        
        setData(data.filter((_,i) => i !== index));
        // some ui rendering...
    }

    async function kycRejected(index){
        // Need to get userId
        const userData = data.filter((_,i) => i === index);
        const userId = userData.userId;
        let res = await (await fetch(`${process.env.REACT_APP_PORTAL}/kyc/reject-kyc`,{
            method:"POST",
            body:JSON.stringify(userId),
            headers:{
                "Content-Type":"application/json"
            }
        })).json();

        console.log(res);
    }

    return {
        fetchAllUnverifiedKycs,
        kycVerified,
        kycRejected,
        data,
        scheduleAMeet
    }
};

export default useKycVerification;