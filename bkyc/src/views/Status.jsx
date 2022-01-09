import React, { useState } from 'react'
import Nav from './Nav'
import Fade from 'react-reveal/Fade';
import '../styles/status.css';
import loadingform from '../assets/loadingform.json';
import Lottie from 'react-lottie';
import Item from '../components/Item';
import useKycVerification from '../hooks/useKycVerfication';
import Footer from '../components/Footer';


const Status = () => {

    const loadingForm = {
        loop: true,
        autoplay: true,
        animationData: loadingform,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const [loading, setLoading] = useState(true);
    const { fetchAllUnverifiedKycs,data,kycVerified,kycRejected } = useKycVerification();

    React.useEffect(async() => {
         await fetchAllUnverifiedKycs();
         setLoading(false);
            
    },[])

    const ActiveForms = () => {
        return (
         <>
            {data  ?
                <div className='active'>
                    {data?.map((item, ind) => (
                        <Item data={item} index={ind} kycVerified={kycVerified} kycRejected={kycRejected}/>
                    )) }
                </div>
                : 
                    <p style={{fontSize: 16, fontFamily: 'Nunito', textAlign: 'center', marginBottom: 24}}>No applications to Show</p>
            }
         </>
        )
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
             <p className='details-text'>Details </p>
            {loading ? 
                        <Lottie
                            options={loadingForm}
                            height={400}
                            width={400}
                        />  : <ActiveForms />}
            <Footer />
        </div>
    )
}

export default Status
