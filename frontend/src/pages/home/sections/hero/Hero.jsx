import { Link } from "react-router-dom"
import { Button } from "../../../../components/buttons/Button";

import "./Hero.css"

export const Hero = () => {
    const text = {
        heading: "Ready to add to your urban jungle?",
        text: "Give our plants a new home, take a look at what we.ve got!",
        btnText: "Shop All Plants"
    }

    return (
        <section>
            <div>
                <h1>{text.heading}</h1>
                <p>{text.text}</p>
                <Link to="plants/all-plants">
                    <Button className={"all-plants-btn"}
                    btnText={text.btnText}
                    ariaLabel={"Get to all plants"}
                    />
                </Link>
            </div>
            <div>
                <img src="./hero-img.png" alt="" />
            </div>
        </section>
    )
}
