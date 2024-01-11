// import OpenAiAssistant from '../components/OpenAIAssistant'
import { useEffect } from 'react';
import { HeroSection } from '../components/heroSection/HeroSection';
import { NewRecipe } from '../components/newRecipe/NewRecipe';
import { CollectionRecipes } from "../components/collectionRecipes/CollectionRecipes"
import { recipeStore } from '../stores/recipeStore';
import "../components/collectionRecipes/collectionRecipes.css";
import "../App.css";

export const Home = () => {
  const { newRecipe, isGenerating } = recipeStore()

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
      <HeroSection />
      {isGenerating ? <div className="spinner-container-new"> {/*CSS for spinner in App.css and collectionRecipes.css*/}
        <div className="spinner"></div><p>Just a minute away from your AI-generated delicious meal!</p></div> : (newRecipe && <NewRecipe />)} {/* Conditionally render NewRecipe only when newRecipe is truthy */}
      <CollectionRecipes />
    </>
  );
};

