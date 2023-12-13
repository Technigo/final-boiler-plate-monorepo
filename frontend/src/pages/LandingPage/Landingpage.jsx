
import { NavBar } from '../../components/NavBar/NavBar';
import { Hero } from '../../components/Hero/Hero';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'; // For rendering nested routes

export const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <div>
        <Outlet /> {/* This is where the content will change */}
      </div>
      <Footer />
    </div>
  );
};