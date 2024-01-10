import "./Input.css";

export const Input = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  ariaLabel,
  labelTxt,
}) => {
  return (
    <>
      <label htmlFor={id}>
        {labelTxt}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={ariaLabel}
          defaultChecked={value}
        />
      </label>
    </>
  );
};
