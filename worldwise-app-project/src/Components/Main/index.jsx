import {memo} from 'react';
import {NavLink,Outlet} from 'react-router-dom';
import MAP from './Map';

export default memo(function(props) {

  return (
    <div className="Main-App">

      <div className="aside-section">
        <NavLink to="/">
          <img className="app-logo" src="/imgs/logo.png" alt="Logo"/>
        </NavLink>

        <div className="cities-countries">
          <NavLink to='/app/cities' activeClassName='active'>CITIES</NavLink>
          <NavLink to='/app/countries' activeClassName='active'>COUNTRIES</NavLink>
        </div>

        <Outlet/>
        <p className="copyright">&copy; Copyright 2024 by <span>@Jude-893</span> Inc.</p>
      </div>


      <MAP />

    </div>
  );
})
