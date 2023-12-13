import { Link } from "react-router-dom";
import { Button } from "../../components/Button"
import "./home.css";
import PlaygroundContainer from "../../components/PlaygroundContainer";
import { NavBar } from "../../components/NavBar";
import { Hero } from "../../components/Hero"

export const Home = () => {


    return (
        <>
        <NavBar />
        <Hero />
        <div className="home-container">
            <h1>Welcome</h1>
            <Link to="/login"><Button className={"button"} btnText={"Get started"} /></Link>
            <PlaygroundContainer />
        </div>
        </>
    )
}