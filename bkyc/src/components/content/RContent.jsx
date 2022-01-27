import React from 'react'
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';

const RContent = (props) => {
    return (
        <div className="sec2">
            <Fade left>
                <div className="img">
                    <img src={props.src} alt={props.alt} />
                </div>
            </Fade>
            <Slide bottom cascade>
                <div className="contentArea">
                    <h3 className="content">Current VKyc Problems</h3>
                    <br />
                    <p className="content">As Covid-19 spreads from the CoronaVirus pandemic, people prefer
                     making transactions at the safety of their home. This brings the issue of "KYC" which has mostly been
                      done "in-person". Institutions now, have resorted to vKYC (the user has to get on a call with the representative)
                       instead of in-person KYC. However for the a regular citizen, re-entering the KYC data over-and-over for each party 
                       along with several vKYC sessions with all institutional representatives is a hassle. In addition, the customer 
                       will have to trust different party's security models or persons with their data and there is a risk of compromise 
                       from each party. Also, since the data is completely handed over to the institution, the user is forcefully stripped 
                       of data ownership. </p>
                </div>
            </Slide>
        </div>
    )
}

export default RContent;
