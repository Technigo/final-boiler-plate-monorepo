import "./Button.css";

export const Button = ({ className, onClick, btnText, ariaLabel }) => {
  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {btnText}
    </button>
  );
};
