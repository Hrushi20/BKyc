import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Avatar, Button, Chip } from '@mui/material';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import '../styles/profile.css';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Nav from './Nav';
import Form4 from '../components/forms/Kyc/form4';
import Form3 from '../components/forms/Kyc/form3';
import Form2 from '../components/forms/Kyc/form2';
import Form1 from '../components/forms/Kyc/form1';
import useKyc from "../hooks/useKyc";
import Lottie from 'react-lottie';
import reviewAnim from '../assets/review.json';
import ethAnim from '../assets/etherium.json';
import Footer from '../components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import useMetamask from '../hooks/useMetamask';
import pay from '../assets/pay.svg';


const StepperForm = ({data, activeStep, setActiveStep}) => {

  function onNextHandler() {
    if(activeStep === 0) {
      data.setClick1(true);
      data.validate1 && setActiveStep(activeStep + 1);
    }
    else if(activeStep === 1) {
       data.setClick2(true);
       data.validate2 && setActiveStep(activeStep + 1);
    }
    else if(activeStep === 2){
       data.validate3 && setActiveStep(activeStep + 1);
    }
  }

  return (
    <div className="kyc-form" style={{height : activeStep === 3 ? 'unset' : 500, padding : activeStep === 3 && 32 }}>
              {activeStep === 0? <Form1 {...data}/>:activeStep === 1 ? <Form2 {...data}/>: activeStep === 2 ?<Form3 {...data}/>:<Form4 {...data}/>}
              <div className="buttons">                
                <Button variant='outlined' disabled={activeStep === 0} color='inherit' onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                <Button variant='outlined' disabled={activeStep === 3} color='inherit' onClick={onNextHandler}>Next</Button>
              </div>
    </div>
  )
}

function Profile() {

    const [cipherKey,setCipherKey] = useState("");
    const { connectToMetamask,getKycFromEthereum,sendKycToEthereum,isInstalled, isConnected } = useMetamask(cipherKey);
    const { setStatus,status ,...data } = useKyc();
    const [activeStep, setActiveStep] = React.useState(0);

    const profileData = useAuth0();

    React.useEffect(() => {

      console.log(isInstalled);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      };
  
      fetch(`${process.env.REACT_APP_PORTAL}/users/store-user`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setStatus(data.status);
            localStorage.setItem("userId",profileData.user.sub);
          })
    },[])

    const review = {
        loop: true,
        autoplay: true,
        animationData: reviewAnim,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

     const etherium = {
        loop: true,
        autoplay: true,
        animationData: ethAnim,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <div>
            <div className="sec1">
              <div className="front profile">
                <Nav />
                <div className="mainHeading">
                    <p className="title">
                      <Fade left cascade> Profile</Fade>
                    </p>
                    <div className="metadata">
                        <Slide left>
                          <Chip className='status' color='success' label= {"status : " + status }  />
                        </Slide>
                          <Avatar
                          className='avatar'
                          alt="Remy Sharp"
                          sx={{ width: 140, height: 140, bgcolor: '#ff9933'}}
                          >
                              <PersonRoundedIcon sx={{width: 80, height: 80}} />
                          </Avatar>
                        <Slide right>
                          <Chip className='email' style={{fontSize: 13}} color='primary' label={"Email : " + profileData.user.email }/>
                        </Slide>
                    </div>
                </div>
              </div>
                <div className="back profile" />
            </div>
            <Zoom>
               <p className="name">{profileData.user.name}</p>
            </Zoom>
            

            {
                status === 'rejected' ? 
                   <p className="statuscontent" style={{fontSize: 15, color: 'red'}} > The previous KYC was rejected. Please fill it again. To know WHY ? <a href='#'> view report </a>  </p>
                : status === 'verified' ? 
                     <>
                        <p className="statuscontent"> Congratulations !!. Your KYC is verified.  </p>
                        <Lottie 
                            options={etherium}
                            height={300}
                            width={300}
                        /> 
                        <p className="statuscontent"> Know your Hash here - <a href='#'> view Hash </a> </p>
                     </>
                : status === 'pending' ? 
                  <>
                       <p className="statuscontent"> Please Wait !!. Your KYC is under process. </p>
                      <Lottie 
                        options={review}
                        height={400}
                        width={400}
                      /> 
                  </>
                : status === 'payment-pending' ? 
                  <div className='payment'>
                    <p className="pay-tit">You are almost there ! </p>
                    <img style={{width:300,height:300}} src={pay} alt="This is an img"/>
                    <p className="pay-cont"> Complete the payment using Metamask to enjoy the benefits of BLOCKCHAIN </p>
                    {!isInstalled ? 
                         <Button color='success' variant='contained'> <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US'> Connected to metamask </a></Button> : 
                         <Button color='success' variant='contained' onClick={connectToMetamask}> {isConnected ? 'Change Address' : 'Connect to Metamask'} </Button>
                    }
                    <div>
                      <label>
                        <span>Cipher Key: </span>
                        <input type="text" value={cipherKey} onChange={(e) => setCipherKey(e.target.value)}/>
                      </label>
                      <Button disabled={!isConnected} variant='outlined' onClick={sendKycToEthereum}> Pay Ethers </Button>
                      {/* <Button disabled={!isConnected} variant='outlined' color='warning' onClick={getKycFromEthereum}>Get data</Button> */}
                    </div>
                  </div> 
                : <></>

            }

            {(status === 'noKYC' || status === 'rejected') && 
              <>
                <Stepper activeStep={activeStep} alternativeLabel>
                    <Step key={0}>
                        <StepLabel >Fill your personal details</StepLabel>
                    </Step>
                    <Step key={1}>
                        <StepLabel>Enter your address and phone-number</StepLabel>
                    </Step>
                    <Step key={2}>
                        <StepLabel >Upload 'AADHAAR' and 'PAN-CARD'</StepLabel>
                    </Step>
                    <Step key={3}>
                        <StepLabel >Upload Live Photo</StepLabel>
                    </Step>
                </Stepper>

                <StepperForm data={data} activeStep={activeStep} setActiveStep={setActiveStep}  />
              </>
            }

            <Footer />
            
        </div>
    )
}

export default Profile;
