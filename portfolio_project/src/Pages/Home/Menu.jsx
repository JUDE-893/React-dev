import {memo} from 'react';

export default function Menu(props) {
  const {toggleLink: toggleLink, activeLink:activeLink,expanded:expanded} = props,
  //const [expanded,setExpanded] = useState(true),
  active = 'navLink activeLink';
  console.log("MENU");
  return (
    <div className={expanded ? "visible-menu" : "hidden-menu"}>
      <div className="navLinks">
        <a href="#" className={activeLink.home ? active : "navLink"} onClick={() => toggleLink('home')}>Home</a>
        <a href="#portfolio" className={activeLink.portfolio ? active : "navLink"} onClick={() => toggleLink('portfolio')}>Portfolio</a>
        <a href="#about" className={activeLink.about ? active : "navLink"} onClick={() => toggleLink('about')}>About Me</a>
        <a href='#testimonials' className={activeLink.testimonials ? active : "navLink"} onClick={() => toggleLink('testimonials')}>Testemonials</a>
      </div>
    </div>
  )
}
