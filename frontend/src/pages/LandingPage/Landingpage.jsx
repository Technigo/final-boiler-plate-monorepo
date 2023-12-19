
import { NavBar } from '../../components/NavBar/NavBar';
import { Hero } from '../../components/Hero/Hero';
import { Footer } from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'; // For rendering nested routes
import { StoryList } from '../../components/StoryList/StoryList';

export const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <StoryList />
      <div className='outlet-wrapper'>
        <Outlet /> {/* This is where the content will change */}
      </div>
      <Footer />
    </div>
  );
};