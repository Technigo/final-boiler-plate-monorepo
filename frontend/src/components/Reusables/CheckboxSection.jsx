import React from 'react';
import { Checkbox } from './Checkbox';

/**
 * CheckboxSection - Reusable section with a label and a checkbox.
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the checkbox section
 * @param {Object} props.form - Form object containing checkbox state
 * @param {number} props.index - Index of the form in the forms array
 * @param {Function} props.setForms - Function to update the forms array state
 * @param {boolean} props.disabled - Flag to disable interactions with the checkbox
 * @returns {JSX.Element} - Rendered CheckboxSection component
 */
export const CheckboxSection = ({ label, form, index, setForms, disabled, id }) => {
    return (
        <div className="mb-2">
            {/* Label for the checkbox section */}
            <label className="mr-2">{label}</label>

            {/* Checkbox component to toggle the checkbox state */}
            <Checkbox
                label={label}
                checked={form[label.toLowerCase()]}
                // Update the form state when the checkbox is toggled
                id={id}
                onChange={() =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, [label.toLowerCase()]: !f[label.toLowerCase()] } : f))
                    )
                }
                // Disable the checkbox if the disabled prop is true
                disabled={disabled}
            />
        </div>
    );
};


