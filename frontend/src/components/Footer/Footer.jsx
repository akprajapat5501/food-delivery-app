import React from 'react'
import "./Footer.css"
import { assets } from "../../assets/assets"

const Footer = () => {
  return (
    <div id='footer' className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt commodi cum, ad voluptatum quia asperiores officiis nam quae neque earum maxime adipisci necessitatibus hic recusandae similique. Tempore, accusantium placeat rem explicabo similique, consectetur aliquam maxime iure, eaque tempora deleniti id.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Devilery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-563-521-5236</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2026 © tomato.com All Rights Reserved.
        </p>
    </div>
  )
}

export default Footer