/**
 * Checkbox Component
 * @param {Object} props - Component properties
 * @param {string} props.label - Label for the checkbox
 * @param {boolean} props.checked - Checked state of the checkbox
 * @param {function} props.onChange - Function to handle checkbox change
 * @param {boolean} props.disabled - Disabled state of the checkbox
 */
export const Checkbox = ({ label, checked, onChange, disabled, error }) => {
    return (
        <div className="flex items-center">
            <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
            <label className="ml-2">{label}</label>
            {error && <p className="text-red-500 ml-2">{error}</p>} {/* Display error message */}
        </div>
    );
};