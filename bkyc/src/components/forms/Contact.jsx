import React from 'react'
import contact from '../../assets/suggestions.svg';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

const ContactForm = () => {
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
                <form className='cform'>
                 <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Name :
                        <input type="text" name="name" />
                        </label>
                    </div>
                 </Fade>
                 <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Email :
                        <input type="text" name="email" />
                        </label>
                    </div>
                  </Fade>
                
                  <Fade right cascade>
                    <div className="inputItem">
                        <label>
                        Essay: <br />
                        <textarea rows={10} cols={34} />
                        </label>
                    </div>
                  </Fade>

                  <Slide bottom cascade>
                    <input className='submit' style={{alignSelf: 'center', padding: '8px 44px', borderRadius: 12, backgroundColor: '#ff9933', border: '1px solid gray', color: 'white'}} type="submit" value="Submit" />
                  </Slide>  
                </form>
            </div>
    )
}

export default ContactForm;
