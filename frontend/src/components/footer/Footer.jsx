// The Footer.jsx component is mounted in the pages "About" and "Home"

import "./footer.css";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="footer">
            <h2 className="footer-title"><Link to="/">Open AIr LOGO?</Link></h2>
            <p>Crafted by Emmy Dieden and Idah Collin <a href="https://www.technigo.io/web-development-boot-camp?utm_source=google&utm_medium=cpc&utm_campaign=SE_Web_BC_PMaxFall2022&utm_adgroup=&utm_keyword=&device=c&gad_source=1&gclid=CjwKCAiAnL-sBhBnEiwAJRGignEdI26zEcDhy8PaJwGSgwQnfi6Q73Ac7nU-wog6RJga0mdReZc8VhoCdsYQAvD_BwE" target="_blank" rel="noopener noreferrer">Technigo</a> 23/24</p>
            <nav className="footer-nav">
                <ul>
                    {/* <li><Link to="/">Home</Link></li> */}
                    <li><Link to="/about">Discover</Link></li>
                </ul>
            </nav>
        </div>
    )
}