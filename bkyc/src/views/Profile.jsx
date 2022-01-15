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

function Profile() {

  const { initMetamask,getKycFromEthereum, ...metamaskData} = useMetamask();
  const {status, setStatus,  ...data } = useKyc();

  const profileData = useAuth0();

  return (
    <div>
      <ProfileHeader status={status} profileData={profileData} />
      {
        status === 'rejected' || status === 'noKYC' ?
          <NoKycOrRejected status={status} data={data} /> :
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
