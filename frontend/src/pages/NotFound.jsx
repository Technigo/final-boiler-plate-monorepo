import notFound from "../assets/404.json";
import Lottie from "lottie-react";
import { Button } from "../components/reusableComponents/Button";

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
        <p>Sorry, we can't seem to find the page you're looking for.</p>
        <Button label="Back to home" link="/home" />
      </div>
    </div>
  );
};
