import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <div className="Nav">
      <Link to="/">
        <img className="app-logo" src="/imgs/logo.png" alt="Logo"/>
      </Link>

      <div className="nav-links">
        <Link to="/pricing">PRICING</Link>
        <Link to="product">PRODUCT</Link>
        <button className="btn" type="button" name="button"><Link to="/login">LOGIN</Link></button>
      </div>

    </div>
  )
}
