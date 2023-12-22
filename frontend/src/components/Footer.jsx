import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>
            Feel free to reach out to us if you have any questions or inquiries.
          </p>
          <ul className="medias-container">
             <li><a href=""><i className="fa-brands fa-linkedin-in"></i></a></li>
             <li><a href=""><i className="fa-brands fa-github"></i></a></li>
             <li><a href=""><i className="fa-brands fa-stack-overflow"></i></a></li>
             <li><a href=""><i className="fa-brands fa-twitter"></i></a></li>
             <li><a href=""><i className="fa-brands fa-instagram"></i></a></li>
         </ul>
          {/* Add your contact information or a contact form here */}
        </div>
        <div className="footer-section">
          <h2>Terms</h2>
          <p>Read our terms and conditions to understand how our platform works.</p>
          {/* Add a link to your terms and conditions page */}
        </div>
        <div className="footer-section">
          <h2>Policy</h2>
          <p>Learn about our privacy policy and how we handle your data.</p>
          {/* Add a link to your privacy policy page */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Greenbuddy. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
};


