import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";
import Select from "react-dropdown-select";

export const Translations = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setShowDropdown(false); // Hide the dropdown after selecting a language
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "sv", label: "Swedish" },
  ];

  // Custom styles for the dropdown, funkar inte
  const dropdownStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "grey",
    }),
  };

  return (
    <div className="translation-buttons">
      <div className="globe-icon" onClick={() => setShowDropdown(!showDropdown)}>
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} />
      </div>
      {showDropdown && (
        <Select
          options={languageOptions}
          values={[
            {
              value: i18n.language,
              label: i18n.language === "en" ? "English" : "Swedish",
            },
          ]}
          onChange={(values) => changeLanguage(values[0].value)}
          labelField="label"
          valueField="value"
          dropdownHandle={false}
          direction="ltr"
          styles={dropdownStyles} // Apply custom styles
          open // Make the dropdown open by default
        />
      )}
    </div>
  );
};
