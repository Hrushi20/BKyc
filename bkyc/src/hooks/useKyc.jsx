import { useState } from 'react';


function useKyc(){

    // Page 1
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [dob,setDob] = useState("");

    // Page 2
    const [address,setAddress] = useState("");
    const [pincode,setPincode] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    // Page 3
    const [pan,setPan] = useState(null);
    const [aadhar,setAadhar] = useState(null);
    const [livePhoto,setLivePhoto] = useState(null);



    async function submitKyc(){

        const formData = new FormData();

        const body = {
            firstName,
            lastName,
            middleName,
            dob,
            address,
            pincode,
            email,
            phoneNumber,
            livePhoto
        }

        formData.append("pan",pan);
        formData.append("aadhar",aadhar);
        formData.append("body",JSON.stringify(body));

        console.log(body)
        let res = await fetch(`${process.env.REACT_APP_PORTAL}/kyc/store-kyc-for-verification`,{
            method: "POST",
            body: formData,
            
        });

        console.log(res);

        // return res;
    }

    return {
        firstName,
        lastName,
        middleName,
        dob,
        address,
        pincode,
        email,
        phoneNumber,
        pan,
        aadhar,
        livePhoto,
        setFirstName,
        setLastName,
        setMiddleName,
        setDob,
        setAddress,
        setPincode,
        setEmail,
        setPhoneNumber,
        setPan,
        setAadhar,
        setLivePhoto,
        submitKyc
    }
};

export default useKyc;