import "./InputField.css";

export const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  ariaLabel,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        defaultChecked={value}
      />
    </>
  );
};
