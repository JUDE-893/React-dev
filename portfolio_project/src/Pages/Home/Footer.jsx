import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub,faXTwitter,faLinkedin} from '@fortawesome/free-brands-svg-icons'


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
          <a href='#updates' className={activeLink.testimonials ? active : "navLink"} onClick={() => toggleLink('testimonials')}>Updates</a>
        </div>
        <div className="social-media">
          <button  onClick={() => window.open('https://github.com/JUDE-893','_blianc')} className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faGithub} /></button>
          <button  onClick={() => window.open('','_blianc')} className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faXTwitter} /></button>
          <button  onClick={() => window.open('','_blianc')} className="social-media-btn" type="button" name="button"><FontAwesomeIcon icon={faLinkedin} /></button>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="by-who">Made With ♥️ In Morocco.</div>
        <div className="copyright">© 2024 <a href="https://github.com/JUDE-893" target='_blanc' style={{color:'inherit'}}>JUDE-893</a> All Rights Reserved.</div>
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
