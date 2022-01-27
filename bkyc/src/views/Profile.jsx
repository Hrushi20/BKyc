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

function Profile({ status, setStatus, role }) {

  const authData = useAuth0();

  console.log(authData);
  const uData = {
    authData,
    role
  }

  const { initMetamask, getKycFromEthereum, ...metamaskData } = useMetamask();

  const { ...data } = useKyc();

  useEffect(() => {
    initMetamask();
    // findUserinMongoose(setStatus, uData);
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uData)
    }
    const loopId = setInterval(async() => {
      let data = await(await fetch(`${process.env.REACT_APP_PORTAL}/users/store-user`, requestOptions)).json()
      const jsonData = { userId: data.userId, role: data.role, status: data.status }
      localStorage.setItem("user-data", JSON.stringify(jsonData));
      setStatus(data.status);
      console.log("Status is being fetched");
    }, 5000);

    return ()=> clearInterval(loopId);
  }, [])


  return (
    <div>
      <ProfileHeader role={role} status={status} />
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
