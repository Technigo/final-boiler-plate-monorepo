// Button.jsx
import { useNavigate } from 'react-router-dom';
import './button.css';
import { Icon } from './Icon';

export const Button = ({ icon, iconSize = 'medium', label, link, className, onClick, ariaLabel, invertIcon }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = (e) => {
    if (onClick) {
      onClick(e); // Pass the event object to the onClick handler
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <button
      className={`button ${className || ''}`}
      onClick={handleClick}
      aria-label={ariaLabel || label}
    >
      {icon && (
        <Icon src={icon} size={iconSize} invert={invertIcon} />
      )}
      <span className="label">{label}</span>
    </button>
  );
};
