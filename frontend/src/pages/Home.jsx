
import { PromptForm } from '../components/PromptForm';
import { NewRecipe } from '../components/newRecipe/NewRecipe';
import { CollectionRecipes } from "../components/collectionRecipes/CollectionRecipes"

export const Home = () => {

  return (
    <>
      <PromptForm />
      <NewRecipe/> 
      <CollectionRecipes />
    </>
  );
};

