import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Avatar, Button, Chip } from '@mui/material';
import Fade from 'react-reveal/Fade';
import '../styles/profile.css';
import blockchain from '../assets/blockchain.svg';
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


const StepperForm = ({data, activeStep, setActiveStep}) => (
    <div className="kyc-form" style={{height : activeStep === 3 ? 'unset' : 450, padding : activeStep === 3 && 32 }}>
              {activeStep === 0? <Form1 {...data}/>:activeStep === 1 ? <Form2 {...data}/>: activeStep === 2 ?<Form3 {...data}/>:<Form4 {...data}/>}
              <div className="buttons">                
                <Button variant='outlined' disabled={activeStep === 0} color='inherit' onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                <Button variant='outlined' disabled={activeStep === 3} color='inherit' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
              </div>
    </div>
)

function Profile() {

    const data = useKyc();
    const [activeStep, setActiveStep] = React.useState(0);
    const [status, setStatus] = React.useState('noKYC');

    console.log(data);

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
                        <Chip className='status' color='success' label= {"status : " + status }  />
                        <Avatar
                        className='avatar'
                        alt="Remy Sharp"
                        sx={{ width: 140, height: 140, bgcolor: '#ff9933'}}
                        >
                            <PersonRoundedIcon sx={{width: 80, height: 80}} />
                        </Avatar>
                        <Chip className='email' color='primary' label="Email : xxxxxxx@gmail.com" />
                    </div>
                </div>
              </div>
                <div className="back profile" />
            </div>

            <p className="name">Guest</p>

            {
                status === 'rejected' ? 
                   <p className="statuscontent" style={{fontSize: 15, color: 'red'}} > The previous KYC was rejected. Please fill it again. To know WHY ? <a href='#'> view report </a>  </p>
                : status === 'verified' ? 
                     <>
                        <p className="statuscontent"> Congratulations !!. Your KYC is verified.  </p>
                        <Lottie 
                            options={etherium}
                            height={400}
                            width={400}
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
