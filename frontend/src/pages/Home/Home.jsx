// import { Link } from "react-router-dom";
// import { Button } from "../../components/Button"
import "./home.css";
import PlaygroundContainer from "../../components/PlaygroundContainer";
// import { NavBar } from "../../components/NavBar";
import { Hero } from "../../components/Hero"
import { Filter } from "../../components/Filter";

export const Home = () => {


    return (
        <>
        {/* <NavBar /> */}
        <Hero />
        <Filter /> 
        <div className="home-container">
            <PlaygroundContainer />
        </div>
        </>
    )
}