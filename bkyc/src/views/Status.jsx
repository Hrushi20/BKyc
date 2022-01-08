import React from 'react'
import Nav from './Nav'
import Fade from 'react-reveal/Fade';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../styles/status.css';



function Status() {


    const ActiveForms = () => {
        return (
            <div className='active'>Active list goes here ... </div>
        )
    };
    
    const PendingForms = () => {
        return (
            <div className='pending'> Pending list goes here ... </div>
        )
    };

    const [alignment, setAlignment] = React.useState('active');
    const [component, setComponent] = React.useState(<ActiveForms />);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        console.log(newAlignment, event);
        if(newAlignment === 'active') setComponent(<ActiveForms />)
        else setComponent(<PendingForms />)
    };

    return (
        <div>
            <div className="sec1">
              <div className="front profile">
                <Nav />
                <div className="mainHeading">
                    <p className="title">
                      <Fade left cascade> status </Fade>
                    </p>
                    <p className="tagline"> Know the status of all the application forms  </p>
                </div>
              </div>
                <div className="back profile" />
            </div> 

            <ToggleButtonGroup
                className= 'toggleButtons'
                color='warning'
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="active">Active</ToggleButton>
                <ToggleButton value="pending">pending</ToggleButton>
            </ToggleButtonGroup>
            {component}
        </div>
    )
}

export default Status
