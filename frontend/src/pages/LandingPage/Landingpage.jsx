import { NavBar } from "../../components/NavBar/NavBar";
import { Hero } from "../../components/Hero/Hero";
import { Footer } from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom"; // For rendering nested routes
import { Smoke } from "../../components/Smoke/Smoke";
import { useRef } from "react";

export const LandingPage = () => {
  const smokeRef = useRef(null);

  const addSplat = () => {
    smokeRef.current?.addRandomSplats(10);
  };

  return (
    <div>
      <Smoke ref={smokeRef} />
      <NavBar onLogoClick={addSplat} />

      <Hero />
      <div className="outlet-wrapper">
        <Outlet /> {/* This is where the content will change */}
      </div>
      <Footer />
    </div>
  );
};
