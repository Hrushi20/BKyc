import React, { useState } from 'react'
import contact from '../../assets/suggestions.svg';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

const ContactForm = () => {

    const [formSubmitted,setFormSubmitted] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");


    function updateForm(type,value){

      switch(type){
        case "name":
          setName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "message":
          setMessage(value);
          break;
        default:
          console.log("Shouldn't be here");
      }

    }

    async function submitForm(){

      const body = {
        name,
        email,
        message
      }

      // Need to create a route to submit the form and store the data in mongoose.
      
      // let res = await fetch(`${process.env.REACT_APP_PORTAL}/contact-us`,{
      //   method:"POST",
      //   body: JSON.stringify(body)
      // });

      

      console.log(body);

      setFormSubmitted(true);

    }

    return (
            <div className='form'>
                <div className="text">
                 <Slide bottom cascade>
                    <p className="contactText">Write To Us !</p>
                 </Slide>
                 <Fade left>
                    <img className="contactSvg" src={contact} alt='Write to us' />
                 </Fade>
                </div>
                
                {!formSubmitted?<form className='cform'>
                 <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Name :
                        <input type="text" name="name" onChange={(e)=>updateForm("name",e.target.value)}/>
                        </label>
                    </div>
                 </Fade>
                 <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Email :
                        <input type="text" name="email" onChange={(e)=>updateForm("email",e.target.value)}/>
                        </label>
                    </div>
                  </Fade>
                
                  <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Message: <br />
                        <textarea rows={10} cols={34} onChange={(e)=>updateForm("message",e.target.value)}/>
                        </label>
                    </div>
                  </Fade>

                  <Slide bottom cascade>
                    <input className='submit' style={{cursor:"pointer" ,alignSelf: 'center', padding: '8px 44px', borderRadius: 12, backgroundColor: '#ff9933', border: '1px solid gray', color: 'white'}} type="submit" value="Submit" onClick={submitForm}/>
                  </Slide>  
                </form>:
              
              <div>
                <h3>Thank you for submitting your form</h3>
                <p>Will reach out to you as soon as possible.</p>
                {/* Lottie file can be added here 
                
                  https://iconscout.com/lottie/thank-you-for-signup-4423290
                  https://iconscout.com/lotties/thank%20you?utm_campaign=search&utm_medium=marketplace&utm_source=lottiefiles
                */}
                
            </div>}
            </div>
    )
}

export default ContactForm;
