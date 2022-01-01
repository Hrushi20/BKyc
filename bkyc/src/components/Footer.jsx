import React from 'react'

const Footer = () => {
    return (
       <div className="footer">
           <div className="left-footer">
                <p className="title foottit">B'KYC'</p>
                <p className="head">Follow us </p>
                <p className="cp"> &copy; Copyright 2022 - B'KYC' <br />
                    All rights reserved 
                 </p>
           </div>
           <div className="right-footer">
               <div className="rl">
                   <div className="contact">
                     <p className="head">Contact </p>
                     <p className="links">xxxxxxx @gmail.com</p>
                     <p className="links">+91 99xxxxxx</p>
                   </div>
                   <div className="help">
                      <p className="head">Help </p>
                     <a className="links" href='#' >Terms Of Use</a>
                    <a className="links" href='#' >Privacy Policy</a>
                    <a className="links"  href='#'>Cookies</a>
                   </div>
               </div>
               <div className="rr">
                  <p className="head">Who We Are ? </p>
                  <a className="links" href='#' >Mission - n - Vision</a>
                    <a className="links" href='#' >Future Updates</a>
                    <a className="links"  href='#'>Who we are ?</a>
               </div>
           </div>
       </div>
    )
}

export default Footer;
