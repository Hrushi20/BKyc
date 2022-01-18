import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Form4 from '../forms/Kyc/form4';
import Form3 from '../forms/Kyc/form3';
import Form2 from '../forms/Kyc/form2';
import Form1 from '../forms/Kyc/form1';
import { Button } from "@mui/material";

const StepperForm = ({ data, activeStep, setActiveStep, setStatus }) => {

    function onNextHandler() {
        if (activeStep === 0) {
            data.setClick1(true);
            data.validate1 && setActiveStep(activeStep + 1);
        }
        else if (activeStep === 1) {
            data.setClick2(true);
            data.validate2 && setActiveStep(activeStep + 1);
        }
        else if (activeStep === 2) {
            data.validate3 && setActiveStep(activeStep + 1);
        }
    }

    return (
        <div className="kyc-form" style={{ height: (activeStep === 3 || activeStep === 2) ? 'unset' : 500, padding: (activeStep === 3 || activeStep === 2) && 32 }}>
            {activeStep === 0 ? <Form1 {...data} /> : activeStep === 1 ? <Form2 {...data} /> : activeStep === 2 ? <Form3 {...data} /> : <Form4 setStatus={setStatus} {...data} />}
            <div className="buttons">
                <Button variant='outlined' disabled={activeStep === 0} color='inherit' onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                <Button variant='outlined' disabled={activeStep === 3} color='inherit' onClick={onNextHandler}>Next</Button>
            </div>
        </div>
    )
}

const NoKycOrRejected = ({ data, status, setStatus }) => {

    const [activeStep, setActiveStep] = useState(0);

    return (
        <>

            {status === 'rejected' && <p className="statuscontent" style={{ fontSize: 15, color: 'red' }} > The previous KYC was rejected. Please fill it again. To know WHY ? <a href='#'> view report </a>  </p>}
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

            <StepperForm data={data} setStatus={setStatus} activeStep={activeStep} setActiveStep={setActiveStep} />
        </>

    )
};

export default NoKycOrRejected;