import {useState,useEffect} from 'react';

import NavBar from "../NavBar";
import Menu from "../Menu";
import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import AboutMe from "../aboutMe";
import MyPortfolio from "../MyPortfolio";
import Testimonials from "../Testimonials";
import Technologies from "../Technologies";
import ContactMe from "../ContactMe";
import Footer from "../Footer";

export default function Home() {

  const [activeLink,setActiveLink] = useState({home:true}),
  [expanded,setExpanded] = useState(false),

  toggleLink = function(name) {
    setActiveLink({[name] : activeLink[name] ? false : true});
    expanded ? setExpanded(false) : setExpanded(true);
  },

  toggleMenu = function() {
    expanded ? setExpanded(false) : setExpanded(true);
    console.log(expanded);
  },

  handleOutClick = function(ev) {
    expanded && ev.target.className !== "navLinks" && ev.target.parentNode.parentNode.className !== "menu-btn"&& ev.target.parentNode.className !== "menu-btn" && ev.target.className !== "menu-btn" ? setExpanded(false) : setExpanded(true);

  };

  useEffect( () => {
    expanded && document.body.addEventListener('mousedown',handleOutClick);
    return () => {document.body.removeEventListener('mousedown',handleOutClick)}
  })

  return (
    <>
      <NavBar toggleLink={toggleLink} activeLink={activeLink} toggleMenu={toggleMenu} expanded={expanded}/>
      <Menu toggleLink={toggleLink} activeLink={activeLink} expanded={expanded}/>
      <HeroSection />
      <MySkills />
      <AboutMe />
      <Technologies />
      <MyPortfolio />
      {false && <Testimonials />}
      <ContactMe />
      <Footer toggleLink={toggleLink} activeLink={activeLink} />

    </>
  )
}
