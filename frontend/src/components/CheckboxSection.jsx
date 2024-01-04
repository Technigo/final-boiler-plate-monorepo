// CheckboxSection.jsx
import React from 'react';
import { Checkbox } from './Checkbox';

export const CheckboxSection = ({ label, form, index, setForms, disabled }) => {
    return (
        <div className="mb-2">
            <label className="mr-2">{label}</label>
            <Checkbox
                checked={form[label.toLowerCase()]}
                onChange={() =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, [label.toLowerCase()]: !f[label.toLowerCase()] } : f))
                    )
                }
                disabled={disabled}
            />
        </div>
    );
};

