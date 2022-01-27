import { useState } from 'react';


function useKyc(){


    // Page 1
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [dob,setDob] = useState("");
    const [validate1, setValidate1] = useState(false);
    const [click1, setClick1] = useState(false);

    // Page 2
    const [address,setAddress] = useState("");
    const [pincode,setPincode] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [validate2, setValidate2] = useState(false);
    const [click2, setClick2] = useState(false);


    // Page 3
    const [pan,setPan] = useState(null);
    const [aadhar,setAadhar] = useState(null);
    const [location, setLocation] = useState({ lat: null, long: null, addr: 'Loading ..'});
    const [validate3, setValidate3] = useState(false);

    //page 4
    const [livePhoto,setLivePhoto] = useState(null);


    async function submitKyc( setStatus ){

        const formData = new FormData();

        const user = localStorage.getItem("user-data");
         const userId = JSON.parse(user).userId;

        const body = {
            firstName,
            lastName,
            middleName,
            dob,
            address,
            pincode,
            email,
            phoneNumber,
            livePhoto,
            userId
        }

        formData.append("pan",pan);
        formData.append("aadhar",aadhar);
        formData.append("body",JSON.stringify(body));

        let res = await(await fetch(`${process.env.REACT_APP_PORTAL}/kyc/store-kyc-for-verification`,{
            method: "POST",
            body: formData,
            
        })).json();

        setStatus(res.status);

        // return res;
    }

    return {
        firstName,
        lastName,
        middleName,
        validate1,
        click1,
        dob,
        address,
        pincode,
        email,
        phoneNumber,
        validate2,
        click2,
        pan,
        aadhar,
        location,
        livePhoto,
        validate3,
        setFirstName,
        setLastName,
        setMiddleName,
        setValidate1,
        setClick1,
        setDob,
        setAddress,
        setPincode,
        setEmail,
        setPhoneNumber,
        setValidate2,
        setClick2,
        setPan,
        setAadhar,
        setLocation,
        setLivePhoto,
        setValidate3,
        submitKyc
    }
};

export default useKyc;