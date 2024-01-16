import { Hero } from "../components/Hero";
import styled from "styled-components";
import { TestimonialsCarousel } from "../components/Testimonials/TestimonialsCarousel";

// Styled components for the HomePage
const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  /* @media (min-width: 800px) {
    gap: 150px;
  } */
`;

const StyledTestimonials = styled.div`
  display: flex;
  flex-direction: column;
  //max-width: 1200px;
  //margin: 0 auto;
`;

// Define the 'Home' functional component.
export const Home = () => {
  // Render the component content.
  return (
    <StyledHomePage>
      <Hero />
      <StyledTestimonials>
        <h3>Stories of kindness</h3>
        <TestimonialsCarousel />
      </StyledTestimonials>
    </StyledHomePage>
  );
};
