import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'

import './Header.css'

export const Header = () => {
  return (
    <header className="the-header page-section" id="the-header">
      <div>{<Link to="/"><h3>CINEMA FK</h3></Link>}</div>
      <NavBar showHamburger={true} />
    </header>
  )
}
