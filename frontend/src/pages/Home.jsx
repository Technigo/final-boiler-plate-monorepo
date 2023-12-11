//ALLA LEKPLATSER SKA FETCHAS HÄR

import { Link } from "react-router-dom";
import { Button } from "../components/Button"
import "./home.css";
import PlaygroundContainer from "../components/PlaygroundContainer";

export const Home = () => {


    return (
        <div className="home-container">
            <h1>Welcome</h1>
            <Link to="/login"><Button className={"button"} btnText={"Get started"} /></Link>
            <PlaygroundContainer />
        </div>
    )
}