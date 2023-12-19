import { NavBar } from "../../components/NavBar/NavBar";
import { Hero } from "../../components/Hero/Hero";
import { Footer } from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom"; // For rendering nested routes
import { Map } from "../../components/Map/Map";
import {
  fluidAnimationStyle,
  animationConfig,
} from "../../components/animationConfig";
import ReactFluidAnimation from "@usertive/react-fluid-animation";
import { useRef } from "react";

export const LandingPage = () => {
  const animationRef = useRef(null);

  // adding random splats when pressing logo in navbar
  const addSplat = () => {
    if (animationRef.current) {
      animationRef.current.addRandomSplats(10);
    }
  };

  return (
    <div>
      <div className="fluid-animation-wrapper">
        <ReactFluidAnimation
          style={fluidAnimationStyle}
          config={animationConfig}
          animationRef={(animation) => (animationRef.current = animation)}
        />
      </div>
      <NavBar onLogoClick={addSplat} />

      <Hero />

      <Map />

      <div>
        <Outlet /> {/* This is where the content will change */}
      </div>
      <Footer />
    </div>
  );
};
