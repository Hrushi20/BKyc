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


function Profile() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [component, setComponent] = React.useState(<Form1 />)
   
    React.useEffect(() => {
        switch (activeStep) {
            case 0:
                setComponent(<Form1 />);
                break;
            case 1:
                setComponent(<Form2 />);
                break;
            case 2:
                setComponent(<Form3 />);
                break;
            case 3:
                 setComponent(<Form4 />);
                 break;
        
            default:
                break;
        }
    }, [activeStep])


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
                        <Chip className='status' color='success' label="Status : verified" />
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

            <div className="kyc-form" style={{height : activeStep === 3 ? 660 : 450}}>
              {component}
              <div className="buttons">                
                <Button variant='outlined' disabled={activeStep === 0} color='inherit' onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                <Button variant='outlined' disabled={activeStep === 3} color='inherit' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
              </div>
            </div>
            
        </div>
    )
}

export default Profile;
