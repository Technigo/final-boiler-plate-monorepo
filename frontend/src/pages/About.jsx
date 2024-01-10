import { useEffect } from 'react';
import { AboutContent } from '../components/about/AboutContent'

export const About = () => {

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
      <AboutContent />
    </>
  )
}
