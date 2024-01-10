import notFound from "../assets/404.json";
import Lottie from "lottie-react";
import { Button } from "../components/reusableComponents/Button";
import "./notfound.css";

export const NotFound = () => {
  // Render a div element with a CSS class 'not-found' containing the text 'NotFound'.
  const style = {
    height: 500,
  };

  return (
    <div className="not-found">
      <Lottie animationData={notFound} style={style} />
      <div className="404">
        <h1>404 Page not found</h1>
        <p>Sorry, we can&apos;t seem to find the page you&apos;re looking for.</p>
        <Button label="Back to home" link="/home" />
      </div>
    </div>
  );
};
