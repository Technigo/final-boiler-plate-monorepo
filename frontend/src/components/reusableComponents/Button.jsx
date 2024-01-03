import { useNavigate } from 'react-router-dom';
//import './button.css';

export const Button = ({ icon, label, link, className, onClick, ariaLabel }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    if (onClick) {
      onClick(); // Custom click handler if provided
    } else if (link) {
      navigate(link); // Navigate to the link if provided
    }
  };

  return (
    <button
      className={`button ${className || ''}`}
      onClick={handleClick}
      aria-label={ariaLabel || label} // Allow custom aria-label
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="icon"
          aria-hidden="true" // Hide the icon from assistive technologies
        />
      )}
      <span className="label">{label}</span>
    </button>
  );
};


//Eaxmple use
//<Button icon="/path/to/icon.svg" label="Go to Home" link="/" />
