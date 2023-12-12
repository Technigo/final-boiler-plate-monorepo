import { useEffect } from "react";
import { recipeStore } from "../../stores/recipeStore";
import "./collectionRecipes.css"

const getAPI = 'http://localhost:3001/recipes';

export const CollectionRecipes = () => {
    const { recipes, setRecipes } = recipeStore()
    const fetchCollectionRecipes = async () => {
        try {

            const response = await fetch(getAPI, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Oh no, error, HTTP! ${response.status}`);
            }

            const data = await response.json();
            setRecipes(data.recipes)
            console.log(recipes)
            // setRecipes(data.recipes)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCollectionRecipes()
        console.log(recipes)
    }, [])

    return (
        <div>
        <h2>Recipes:</h2>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              {/* Render your recipe details here */}
              <div>{recipe.ingredients}</div>
              <div>{recipe.instructions}</div>
            </li>
          ))}
        </ul>
      </div>
    )
}

