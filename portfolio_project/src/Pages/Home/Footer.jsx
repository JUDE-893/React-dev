import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF,faInstagram,faXTwitter,faLinkedin} from '@fortawesome/free-brands-svg-icons'


export default function Footer(props) {

  const {toggleLink: toggleLink, activeLink:activeLink} = props,
  //const [activeLink,setActiveLink] = useState({home:true}),
  active = 'navLink activeLink';

  console.log("Footer");
  return (
    <div id="footer">

      <div className="Nav Nav-footer">
        <div className="navLogo nav-footer-Logo">
          <img src="./img/logo.png" alt="logo"  /> <span> MyPortfo</span>
        </div>
        <div className="navLinks nav-footer-Links">
          <a href="#" className={activeLink.home ? active : "navLink"} onClick={() => toggleLink('home')}>Home</a>
          <a href="#portfolio" className={activeLink.portfolio ? active : "navLink"} onClick={() => toggleLink('portfolio')}>Portfolio</a>
          <a href="#about" className={activeLink.about ? active : "navLink"} onClick={() => toggleLink('about')}>About Me</a>
          <a href='#testimonials' className={activeLink.testimonials ? active : "navLink"} onClick={() => toggleLink('testimonials')}>Testemonials</a>
        </div>
        <div className="social-media">
          <button  className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faFacebookF} /></button>
          <button  className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faInstagram} /></button>
          <button  className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faXTwitter} /></button>
          <button  className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faLinkedin} /></button>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="by-who">Made With ♥️ In Italy.</div>
        <div className="copyright">© 2024 JUDE-893 All Rights Reserved.</div>
        <div className="Terms">
          <a href="#" className="">Privecy Policy</a>
          <a href="#" className="">Terms of Service</a>
          <a href="#" className="">Cookies Setting</a>
        </div>
      </div>

      <div className=""></div>
      <div className=""></div>

    </div>
  )
}
