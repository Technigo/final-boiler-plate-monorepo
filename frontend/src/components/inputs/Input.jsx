import "./Input.css";

export const Input = ({ type, id, placeholder, value, onChange, ariaLabel }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  );
};
