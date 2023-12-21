import { Link } from "react-router-dom";
import Lottie from "lottie-react"
import HomePicture from "../HomePicture2.json"

export const Home = () => {


  return (
    <>
      <h1>Welcome to Piggy Back</h1>
      <Lottie animationData={HomePicture} />
      <h2>Your simple and safe carpool near you</h2>
      <p>
        <Link to="/login">Login</Link>
        
        <Link to="/register">Register</Link>
      </p>
    </>
  );
};
