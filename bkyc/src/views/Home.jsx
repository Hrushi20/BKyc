import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/home.css';
import Fade from 'react-reveal/Fade';
import blockchain from '../assets/blockchain.svg';
import secure from '../assets/secure.svg';
import RContent from "../components/content/RContent";
import LContent from "../components/content/LContent";
import ContactForm from "../components/forms/Contact";
import Footer from "../components/Footer";
import Nav from "./Nav";
import {  toast } from 'react-toastify';
import useMetamask from '../hooks/useMetamask';
import useKyc from "../hooks/useKyc";
import UserRole from './UserRole';

const Home = ({role,setRole}) => {
 
  const { setStatus } = useKyc();
  const { initMetamask } = useMetamask();
  const authData = useAuth0();

async function findUserinMongoose() {
    console.log("In find user fn ");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
    }
      console.log("data1");
      const data = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/get-user`, requestOptions)).json();
      console.log("data2");
      localStorage.setItem("userId", authData.user.sub);
  
      initMetamask(); 
      setStatus(data.status ?? '...');
      setRole(data.role ?? null);

      console.log("role is ", data);
  }

   React.useEffect(() => {
      authData.isAuthenticated ? toast.success(`Logged in using ${authData.user.email} !`, {
        position: toast.POSITION.TOP_CENTER,
        style: { lineHeight: 1.5}
      }) : toast.success("Logged out Successfully !", {
        position: toast.POSITION.TOP_CENTER
      })

      findUserinMongoose();
   }, [role])

    console.log(useAuth0());

    return(
      <>
       {authData.isAuthenticated && role == null ? <UserRole role={role} setRole={setRole} /> :
         <div className="body">
              <div className="sec1">
                  <div className="front">
                      <Nav />
                      <div className="mainHeading">
                          <p className="title">
                            <Fade left cascade> B'KYC'</Fade>
                          </p>
                          <p className="tagline"> KYC of users using <big className="tech">blockchain</big> technology </p>
                      </div>
                  </div>
                  <div className="back" />
              </div>
              <RContent src={blockchain} alt="blockchain technology" />
              <LContent src={secure} alt="Secure application" />
              <div className="contact-form">
                  <ContactForm />
              </div>
              <Footer />
        </div>  }
      </>
    )
};

export default Home;