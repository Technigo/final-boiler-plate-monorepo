import { create } from "zustand"

export const recipeStore = create((set) => ({
    recipes: [],
    setRecipes: (recipes) => set({ recipes }),

    addNewRecipe: (newRecipe) => {
        set((state) => ({
            recipes: [...state.recipes, newRecipe],
        }));
    }

}))

