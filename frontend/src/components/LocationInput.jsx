import { useState, useEffect, useRef } from "react";
import locationsData from "../data/locations.json";
import PropTypes from "prop-types";

export const LocationInput = ({
  label,
  name,
  value,
  onChange,
  setFormData,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const lowerCaseInput = inputValue.toLowerCase();
    const matchingSuggestions = locationsData.locations.filter((location) =>
      location.toLowerCase().startsWith(lowerCaseInput)
    );

    const isValidInput =
      matchingSuggestions.length > 0 || inputValue.trim() === "";

    setSuggestions(matchingSuggestions.slice(0, 5));
    setIsValid(isValidInput);

    if (isValidInput && !isSuggestionSelected) {
      setFormData((prevData) => ({ ...prevData, [name]: inputValue }));
    }
  }, [inputValue, name, setFormData, isSuggestionSelected]);

  const handleSelect = (selectedValue) => {
    setInputValue(selectedValue);
    onChange({ target: { name, value: selectedValue } });
    setSuggestions([]);
    setIsSuggestionSelected(true);
  };

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    const capitalizedInput =
      newInputValue.charAt(0).toUpperCase() + newInputValue.slice(1);
    setInputValue(capitalizedInput);
    setIsSuggestionSelected(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSelect(suggestion);
    setTimeout(() => {
      inputRef.current.focus();
    }, 10);
  };

  const handleInputKeyDown = (e) => {
    console.log("Key pressed:", e.key);

    if (e.key === "Escape") {
      console.log("Clearing suggestions...");
      setSuggestions([]);
    }

    if (e.key === "Enter" && suggestions.length > 0) {
      console.log("Selecting suggestion:", suggestions[0]);
      handleSelect(suggestions[0]);
      inputRef.current.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="mb-0 relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        className={`input-field border p-2 rounded-md w-full ${
          isValid ? "" : "border-red-500"
        }`}
        maxLength={17}
      />
      {!isValid && (
        <p className="text-red-500 text-xs mt-1">
          {isSuggestionSelected
            ? "Please enter a valid location"
            : "Please enter a valid location"}
        </p>
      )}
      {inputValue && suggestions.length > 0 && (
        <ul className="suggestion-list absolute w-full bg-white border border-gray-300 rounded-md z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="suggestion-item cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

LocationInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
