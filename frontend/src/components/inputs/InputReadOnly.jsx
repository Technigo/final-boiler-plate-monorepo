import "./InputField.css";

export const InputReadOnly = ({
  type,
  id,
  placeholder,
  value,
  ariaLabel,
  labelTxt,
  className,
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
          className={className}
        />
      </label>
    </>
  );
};
