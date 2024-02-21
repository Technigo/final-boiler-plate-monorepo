import { NavBar } from '../../components/NavBar/NavBar';
import { Hero } from '../../components/Hero/Hero';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'; // For rendering nested routes
import { Smoke } from '../../components/Smoke/Smoke';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/AnimationLoading.json';

export const LandingPage = () => {
  const smokeRef = useRef(null);
  const [serverAwake, setServerAwake] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000';

  useEffect(() => {
    // Check server status when the app starts
    checkServerStatus();
  });

  const checkServerStatus = async () => {
    try {
      // Make a request to a specific endpoint to check server status
      const response = await fetch(`${apiUrl}/server/status`);
      if (response.ok) {
        setServerAwake(true);
      }
    } catch (error) {
      console.error('Error checking server status:', error);
    }
  };

  const addSplat = () => {
    smokeRef.current?.addRandomSplats(10);
  };

  return (
    <div>
      <Smoke ref={smokeRef} />
      <NavBar onLogoClick={addSplat} />

      <Hero />
      <div className="outlet-wrapper">
        {serverAwake ? (
          <Outlet />
        ) : (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={200}
            width={200}
          />
          // <div className="loading-page">Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};
