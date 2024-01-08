import { Hero } from "../components/Hero";
import styled from "styled-components";
import { TestimonialsCarousel } from "../components/Testimonials/TestimonialsCarousel";

// Styled components for the HomePage
const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  img {
    object-fit: cover;
    opacity: 0.8;
    border: 2px solid floralwhite;
    border-radius: 20px 0 20px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 800px) {
    gap: 150px;
  }
`;

const StyledPictures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledTestimonials = styled.div`
  display: flex;
  flex-direction: column;
`;

// Define the 'Home' functional component.
export const Home = () => {
  // Render the component content.
  return (
    <StyledHomePage>
      {/* <img src="/Group-photo.jpg" alt="Group of people" /> */}
      <Hero />
      <StyledTestimonials>
        <h3>Stories of kindness</h3>
        <TestimonialsCarousel />
      </StyledTestimonials>
      <StyledPictures>
        <img src="/Car-repair2.jpg" alt="Men repairing a car" />
        <img src="/Dog-walking.jpg" alt="Woman walking dog in woods" />
        <img src="/Snow-shoveling.jpg" alt="Older man shoveling snow" />
      </StyledPictures>
    </StyledHomePage>
  );
};
