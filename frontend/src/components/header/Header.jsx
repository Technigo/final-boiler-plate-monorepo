import "./header.css";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">Open AIr Feast</h1>
      <nav classNAme="header-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  )
}
