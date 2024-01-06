// Button.jsx
import { useNavigate } from 'react-router-dom';
import './button.css';
import { Icon } from './Icon';

export const Button = ({ icon, iconSize = 'medium', label, link, className, onClick, ariaLabel, invertIcon }) => {
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
      aria-label={ariaLabel || label}
    >
      {icon && (
        <Icon src={icon} size={iconSize} invert={invertIcon} />
      )}
      <span className="label">{label}</span>
    </button>
  );
};
