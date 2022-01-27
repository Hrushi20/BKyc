import React, { useState } from 'react'
import contact from '../../assets/suggestions.svg';
import Slide from 'react-reveal/Slide';
import Msg from '../../assets/msg.json';
import Fade from 'react-reveal/Fade';
import Lottie from 'react-lottie';
import { TextareaAutosize, TextField } from "@mui/material";


const ContactForm = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const msg = {
    loop: false,
    autoplay: true,
    animationData: Msg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };



  function updateForm(type, value) {

    switch (type) {
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

  async function submitForm() {

    const body = {
      name,
      email,
      message
    }

    // Need to create a route to submit the form and store the data in mongoose.

    fetch(`${process.env.REACT_APP_PORTAL}/users/get-messages`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => console.log(res))

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

      {!formSubmitted ? <form className='cform'>
        <Fade right cascade>
          <div className="inputItem">
            {/* <label>
                        Name : */}
            <TextField style={{ width:310 }}  required type="text" label="Name" variant="outlined" name="name" onChange={(e) => updateForm("name", e.target.value)} />
            {/* </label> */}
          </div>
        </Fade>
        <Fade right cascade>
          <div className="inputItem">
            {/* <label>
                        Email : */}
            <TextField style={{ width:310 }} required type="text" variant="outlined" label="Email" onChange={(e) => updateForm("email", e.target.value)} />
            {/* </label> */}
          </div>
        </Fade>

        <Fade right cascade>
          <div className="inputItem">
            {/* <label>
                        Message: <br /> */}
            <TextareaAutosize
              maxRows={6}
              aria-label="empty textarea"
              placeholder="Message"
              style={{ resize:"none",padding:15,width:275 }}
              onChange={(e) => updateForm("message", e.target.value)}
            />
            {/* </label> */}
          </div>
        </Fade>

        <Slide bottom cascade>
          <input className='submit' style={{ cursor: "pointer", alignSelf: 'center', padding: '8px 44px', borderRadius: 12, backgroundColor: '#ff9933', border: '1px solid gray', color: 'white' }} type="submit" value="Submit" onClick={submitForm} />
        </Slide>
      </form> :

        <div className='msg-sent' >
          <Lottie
            options={msg}
            height={250}
            width={250}
          />
          <div className="texts">
            <p>Thank you for submitting your form</p>
            <p>We will reach out to you as soon as possible.</p>
          </div>


        </div>}
    </div>
  )
}

export default ContactForm;
