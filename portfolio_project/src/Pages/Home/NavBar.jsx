import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars,faXmark} from '@fortawesome/free-solid-svg-icons';


export default function NavBar(props) {
  const {toggleLink: toggleLink, activeLink:activeLink,toggleMenu:toggleMenu,expanded:expanded} = props,
  //const [expanded,setExpanded] = useState(true),
  active = 'navLink activeLink';


  return(
    <div className="Nav">
      <div className="navLogo">
        <img src="./img/logo.png" alt="logo"  /> <span> MyPortfo</span>
      </div>
      <div className="navLinks">
        <a href="#" className={activeLink.home ? active : "navLink"} onClick={() => toggleLink('home')}>Home</a>
        <a href="/portfolio" className={activeLink.portfolio ? active : "navLink"} onClick={() => toggleLink('portfolio')}>Portfolio</a>
        <a href="#about" className={activeLink.about ? active : "navLink"} onClick={() => toggleLink('about')}>About Me</a>
        <a href='#updates' className={activeLink.testimonials ? active : "navLink"} onClick={() => toggleLink('testimonials')}>Updates</a>
      </div>
      <div className="contactBtn">
        <button  className='btn btn-outline-primary' type="button" name="button" onClick={() => document.location.replace('#Contact')}><a style={{color:'inherit'}}>Contact Me</a></button>
      </div>

      <div className="menu">
        <button  className='menu-btn' type="button" name="button"  onClick={toggleMenu} ><FontAwesomeIcon icon={expanded ? faXmark : faBars} /></button>
      </div>

    </div>
  )
}
