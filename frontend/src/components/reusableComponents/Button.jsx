//import './button.css'

export const Button = ({ icon, label, link, className, onClick, ariaLabel }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <button
      className={`button ${className || ''}`}
      onClick={onClick || handleClick}
      aria-label={ariaLabel || label} // Allow custom aria-label
    >
      <img
        src={icon}
        alt=""
        className="icon"
        aria-hidden="true" // Hide the icon from assistive technologies
      />
      <span className="label">{label}</span>
    </button>
  );
};
