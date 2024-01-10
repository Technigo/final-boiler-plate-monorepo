import "./home.css";
import PlaygroundContainer from "../../components/PlaygroundContainer";
import { Hero } from "../../components/Hero"

export const Home = () => {


    return (
        <> 
        <Hero />
        <div className="home-container">
            <PlaygroundContainer />
        </div>
        </>
    )
}