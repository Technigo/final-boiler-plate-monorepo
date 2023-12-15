import "./Buttons.css";

export const Buttons = ({ buttonText, url, onClick }) => {
  const handleClick = () => {
    console.log(`Clicked ${buttonText}`);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className="buttons">
      {buttonText}
    </button>
  );
};
