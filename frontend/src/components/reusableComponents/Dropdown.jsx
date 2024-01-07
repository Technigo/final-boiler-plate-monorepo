import { useState } from 'react';

export const Dropdown = ({ options, defaultOption }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <select value={selectedValue} onChange={handleChange}>
                <option value="">{defaultOption || 'Select an option'}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};