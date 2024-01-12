/**
 * Custom FormField component for input elements.
 * @param {object} props - Component props.
 * @param {string} props.label - Label for the input field.
 * @param {string} props.type - Type of the input field (e.g., text, number).
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.value - Current value of the input field.
 * @param {function} props.onChange - Callback function for input change.
 * @param {string} props.error - Error message to display.
 * @returns {JSX.Element} - Rendered component.
 */

export const FormField = ({ name, label, type, placeholder, value, onChange, error }) => (
    <div>
        <label className="text-s font-josefin-sans">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="text-s font-josefin-sans mb-2 p-2 w-full border rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
    </div>
);