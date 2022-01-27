import React from 'react'
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';

const RContent = (props) => {
   return (
      <div className="sec2">
         <Slide bottom cascade>
            <div className="contentArea">
               <h3 className="content">Our Solution</h3>
               <br />
               <p className="content">The user starts of by creating an account in BKYC and uploading their kyc.
                  An AI model verifies the correctness of the entered data and a validator validates the KYC data. After verification the kyc is encrypted using a cipher Key and stored on the IPFS. This key allows retrieval of the integrated data off the IPFS.
                  Finally, the user is prompted to make a (an irrevokable) payment to store the encrypted data via the cipher key on the blockchain.
                  The user is now fully in control of which institution gain access to their KYC data. Once an institution is granted the required permissions it can then retrieve the user's KYC from the blockchain.
               </p>
            </div>
         </Slide>
         <Fade right>
            <div className="img">
               <img src={props.src} alt={props.alt} />
            </div>
         </Fade>
      </div>
   )
}

export default RContent;
