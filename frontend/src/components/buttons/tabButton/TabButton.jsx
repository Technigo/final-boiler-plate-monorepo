import { useState } from "react";
import { IngredientsDetails } from "../../recipeDetailsComponents/ingredientsDetails/IngredientsDetails";
import { MethodDetails } from "../../recipeDetailsComponents/methodDetails/MethodDetails";
import "./tabButton.css";

export const TabButton = ({ ingredients, instructions }) => {
  const [activeTab, setActiveTab] = useState("ingredients"); // Default to 'ingredients'

  // Function to handle tab button click events and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="tab-button">
        {/* Ingredients tab button */}
        <button
          className={`tab-button-ingredients ${activeTab === "ingredients" ? "active" : ""
            }`}
          onClick={() => handleTabClick("ingredients")}
        >
          Ingredients
        </button>
        {/* Method tab button */}
        <button
          className={`tab-button-method ${activeTab === "method" ? "active" : ""
            }`}
          onClick={() => handleTabClick("method")}
        >
          Method
        </button>
      </div>
      {/* Conditional rendering based on the active tab */}
      {activeTab === "ingredients" ? (
        <IngredientsDetails ingredients={ingredients} />
      ) : (
        <MethodDetails instructions={instructions} />
      )}
    </>
  );
};
