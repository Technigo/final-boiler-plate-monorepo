import { Button } from "../../components/buttons/Button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="not-found">
        <h2>Not Found</h2>
        <p>Hi plant babe! I'm sorry to say, this page doesn't exist.. or at least I can't find it for you. 🥲 </p>
        <p>Let me take you back home...</p>
        <Link to="/">
          <Button className={"back-home-btn"}  ariaLabel={"Go back to home page"} btnText={"back to home"}/>
        </Link>
    </section>
  );
};

