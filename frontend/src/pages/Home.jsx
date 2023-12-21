// import OpenAiAssistant from '../components/OpenAIAssistant'
import { Header } from '../components/header/Header';
import { HeroSection } from '../components/heroSection/HeroSection';
import { NewRecipe } from '../components/newRecipe/NewRecipe';
import { CollectionRecipes } from "../components/collectionRecipes/CollectionRecipes"
import { recipeStore } from '../stores/recipeStore';

export const Home = () => {
  const { newRecipe, isGenerating } = recipeStore()
  return (
    <>
      <Header />
      <HeroSection/>
      {isGenerating ? <p>Generating your delicious outdoor meal...</p>: (newRecipe && <NewRecipe />)} {/* Conditionally render NewRecipe only when newRecipe is truthy */}
      <CollectionRecipes />
    </>
  );
};

