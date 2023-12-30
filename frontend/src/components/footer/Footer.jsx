// The Footer.jsx component is mounted in the pages "About" and "Home"

import "./footer.css";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="footer">
            <h1 className="footer-title">Open AIr Feast</h1>
            <p>Open Air Feast is the final project of Emmy Dieden and Idah Collin (2023/2024). The project was developed during the <a href="https://www.technigo.io/web-development-boot-camp?utm_source=google&utm_medium=cpc&utm_campaign=SE_Web_BC_PMaxFall2022&utm_adgroup=&utm_keyword=&device=c&gad_source=1&gclid=CjwKCAiAnL-sBhBnEiwAJRGignEdI26zEcDhy8PaJwGSgwQnfi6Q73Ac7nU-wog6RJga0mdReZc8VhoCdsYQAvD_BwE" target="_blank" rel="noopener noreferrer">Technigo Web Developer Bootcamp</a>. For contact information and additional details about the project, please refer to the 'About' section.</p>
            <nav className="footer-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </div>
    )
}