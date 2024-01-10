import "./dropdown.css";

export const Dropdown = ({ options, value, onChange, defaultOption, className }) => {
    return (
        <div>
            <select className={className} value={value} onChange={onChange}>
                <option value="">{defaultOption || "Select an option"}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
