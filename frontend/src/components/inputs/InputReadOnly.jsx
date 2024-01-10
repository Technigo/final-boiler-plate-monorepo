import "./Input.css";

export const InputReadOnly = ({
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
          readOnly
          aria-label={ariaLabel}
          defaultChecked={value}
        />
      </label>
    </>
  );
};
