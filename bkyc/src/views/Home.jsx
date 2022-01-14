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

  const uData = {
    authData,
    role
  }

  async function findUserinMongoose() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uData)
    }
      const data = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/store-user`, requestOptions)).json();
      const jsonData = { userId : data.userId, role: data.role }
      localStorage.setItem("user-data", JSON.stringify(jsonData));
      console.log("item set");
      initMetamask(); 
      setStatus(data.status);
      setRole(data.role);
  }

   React.useEffect(() => {
      console.log("home useeffect and role : ", role);
      const user = localStorage.getItem("user-data");
      if(user){
        const roleName = JSON.parse(user).role;
        setRole(roleName);
      }
      if(role == null ){
        authData.isAuthenticated ? toast.success(`Logged in using ${authData.user.email} !`, {
        position: toast.POSITION.TOP_CENTER,
        style: { lineHeight: 1.5 }
        }) : toast.success("Logged out Successfully !", {
          position: toast.POSITION.TOP_CENTER
        })
      }

       role!=null && findUserinMongoose();
   }, [role])



    return(
      <>
       {authData.isAuthenticated && role == null ?  <UserRole role={role} setRole={setRole} /> :
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