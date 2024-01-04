import "./header.css";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title"><Link to="/">Open AIr Feast</Link></h1>
      <nav className="header-nav">
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="/about">Discover</Link></li>
        </ul>
      </nav>
    </div>
  )
}
