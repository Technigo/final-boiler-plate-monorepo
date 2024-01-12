/**
 * RadioButton Component
 * @param {Object} props - Component properties
 * @param {string} props.label - Label for the radio button
 * @param {boolean} props.checked - Checked state of the radio button
 * @param {function} props.onChange - Function to handle radio button change
 * @param {boolean} props.disabled - Disabled state of the radio button
 * @param {boolean} props.error - Error state for the radio button
 * @param {string} props.id - Unique identifier for the radio button
 */
export const RadioButton = ({ label, checked, onChange, disabled, error, id, name }) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label className="ml-2" htmlFor={id}>{label}</label>  {/* Make sure htmlFor matches the id */}
            {error && <p className="text-red-500 ml-2">{error}</p>}
        </div>
    );
};
