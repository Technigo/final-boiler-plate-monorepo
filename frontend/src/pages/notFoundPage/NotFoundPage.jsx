import { Button } from "../../components/buttons/Button";
import { Link } from "react-router-dom";
import "./NotFoundPage.css"

export const NotFoundPage = () => {

  const content = {
    title: "Not Found",
    body: "Hi plant babe! I'm sorry to say, this page doesn't exist.. or at least I can't find it for you. 🥲",
    ps: "Let me take you back home..."
  }

  return (
    <div className="page-container-primary">
      <section className="not-found">
        <h1 className="page-title">{content.title}</h1>
        <p className="h2-p">{content.body}
        </p>
        <p className="h2-p">{content.ps}</p>
        <Link to="/">
          <Button
            className={"terracotta-btn checkout-btn"}
            ariaLabel={"Go back to home page"}
            btnText={"back to home"}
          />
        </Link>
      </section>
    </div>
  );
};
