import {memo,useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faFilm, faTv, faHeart} from "@fortawesome/free-solid-svg-icons";


export default memo( function Menu(props) {

  const [activeLink,setActiveLink] = useState(0),
  navigate = useNavigate();

  var handleActive = function(i) {
    i !== activeLink && setActiveLink(i)
  },

  handleNavigate = function(e,url,type,endpoint) {
    e.preventDefault();
    let params = {type: type, endpoint: endpoint};
    navigate(url, {state:params});
  };

  return(

    <div className={`menu ${props.menuReduced ? "menu-reduced" : ""}`}>
    {console.log("menuReduced : ",props.menuReduced)}
      <div className="">
        <NavLink  activeClassName="active" to="/" ><FontAwesomeIcon icon={faHouse} />Home</NavLink>
        <NavLink  activeClassName="active" to="/Movies" onClick={(e) => handleNavigate(e,"/Movies",'movie','discover/movie')}><FontAwesomeIcon icon={faFilm} />Movies</NavLink>
        <NavLink  activeClassName="active" to="/TvShows" onClick={(e) => handleNavigate(e,"/TvShows",'tv','discover/tv')}><FontAwesomeIcon icon={faTv} />TV Shows</NavLink>
        <NavLink  activeClassName="active" to="/Favorite" ><FontAwesomeIcon icon={faHeart} />Favorite</NavLink>
      </div>

    </div>
  )




})
