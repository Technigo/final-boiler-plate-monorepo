import { useState } from "react"
import { IngredientsDetails } from "../../recipeDetailsComponents/ingredientsDetails/IngredientsDetails"
import { MethodDetails } from "../../recipeDetailsComponents/methodDetails/MethodDetails"

import "./tabButton.css"

export const TabButton = ({ ingredients, instructions }) => {
  const [activeTab, setActiveTab] = useState('ingredients'); // Default to 'ingredients'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="tab-button">
        <button
          className={`tab-button-ingredients ${activeTab === 'ingredients' ? 'active' : ''}`}
          onClick={() => handleTabClick('ingredients')}
        >
          Ingredients
        </button>
        <button
          className={`tab-button-method ${activeTab === 'method' ? 'active' : ''}`}
          onClick={() => handleTabClick('method')}
        >
          Method
        </button>

      </div>
      {activeTab === 'ingredients' ? <IngredientsDetails ingredients={ingredients} /> : <MethodDetails instructions={instructions} />}
    </>
  )
}

