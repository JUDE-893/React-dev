import {memo} from 'react';
import {Link,Outlet,useLocation} from 'react-router-dom';
import Nav from "./Nav"

export default memo(function Home(){

  const location = useLocation();
  const notInserted = location.pathname === '/'
  return (
    <main className={notInserted ? "Home" : ""}>
      <Nav/>

      { notInserted ? <div className="home-section">
        <h1>You travel the world.</h1>
        <h1>WorldWise keeps track of your adventures.</h1>
        <p className="">A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</p>
        <button className="btn" type="button" name="button"><Link to="/login">START TRACKING NOW</Link></button>
      </div>
      :<Outlet/>}

    </main>
  )
})
