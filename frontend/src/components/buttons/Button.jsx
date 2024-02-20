import "./Buttons.css";

export const Button = ({ className, type, onClick, btnText, ariaLabel }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {btnText}
    </button>
  );
};
