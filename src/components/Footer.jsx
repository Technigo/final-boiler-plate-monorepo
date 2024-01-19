import { NavBar } from './NavBar'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="the-footer page-section">
      <div className="the-contact-container">
        <div className="contact-info">
          <h3>CINEMA FK</h3>
          <p>hello@cinemafk.com</p>
          <p>070 234 56 66</p>
          <p>Stockholm</p>
        </div>
        <div className="nav-bar">
          <NavBar showHamburger={false} />
        </div>
      </div>
      <p className="copyright"> © Frida & Klaudia for Technigo</p>
    </footer>
  )
}
