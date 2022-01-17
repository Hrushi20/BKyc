import React, { useState, useEffect } from 'react'
import '../styles/profile.css';
import useKyc from "../hooks/useKyc";
import Footer from '../components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import useMetamask from '../hooks/useMetamask';
import Verified from "../components/profile/verified";
import PaymentPending from '../components/profile/payment-pending';
import NoKycOrRejected from '../components/profile/noKyc-reject';
import Pending from '../components/profile/pending';
import ProfileHeader from '../components/profile/header';

function Profile({status, setStatus , role}) {

  const authData = useAuth0();

  const uData = {
    authData,
    role
  }

  const { initMetamask,getKycFromEthereum, ...metamaskData} = useMetamask();

  const { ...data } = useKyc();


  async function findUserinMongoose(setStatus, uData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uData)
    }
      const data = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/store-user`, requestOptions)).json();
      const jsonData = { userId : data.userId, role: data.role, status: data.status }
      localStorage.setItem("user-data", JSON.stringify(jsonData));
      console.log("item set");
      setStatus(data.status);
  }

  

  useEffect(() => {
      initMetamask(); 
      findUserinMongoose(setStatus, uData);
    }, [])


  return (
    <div>
      <ProfileHeader status={status} profileData={authData} />
      {
        status === 'rejected' || status === 'noKYC' ?
          <NoKycOrRejected status={status} setStatus={setStatus} data={data} /> :
          status === 'verified' ?

            <Verified
              getKycFromEthereum={getKycFromEthereum}
             />

            : status === 'pending' ?

              <Pending />

              : status === 'payment-pending' ?
                <PaymentPending 
                {...metamaskData}
                />
                : <></>

      }


      <Footer />

    </div>
  )
}

export default Profile;
