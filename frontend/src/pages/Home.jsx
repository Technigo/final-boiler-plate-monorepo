// import OpenAiAssistant from '../components/OpenAIAssistant'
import { Header } from '../components/header/Header';
import { HeroSection } from '../components/heroSection/HeroSection';
import { NewRecipe } from '../components/newRecipe/NewRecipe';
import { CollectionRecipes } from "../components/collectionRecipes/CollectionRecipes"
import { recipeStore } from '../stores/recipeStore';
import { Footer } from '../components/footer/Footer';
import "../components/collectionRecipes/collectionRecipes.css";
import "../App.css";

export const Home = () => {
  const { newRecipe, isGenerating } = recipeStore()
  return (
    <>
      <Header />
      <HeroSection />
      {isGenerating ? <div className="spinner-container-new"> {/*CSS for spinner in App.jcss and collectionRecipes.css*/}
        <div className="spinner"></div><p>Just a minute away from your AI-generated delicious meal!</p></div> : (newRecipe && <NewRecipe />)} {/* Conditionally render NewRecipe only when newRecipe is truthy */}
      <CollectionRecipes />
      <Footer />
    </>
  );
};

