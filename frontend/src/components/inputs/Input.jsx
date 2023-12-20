import "./Input.css";

export const Input = ({ type, placeholder, value, onChange, ariaLabel }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  );
};
