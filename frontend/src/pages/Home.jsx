import { Hero } from "../components/Hero";
import { Heading2 } from "../components/Typography/Heading2";
import { TestimonialsCarousel } from "../components/Testimonials/TestimonialsCarousel";
import styled from "styled-components";

// Styled components for the HomePage
const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
      <Hero /> {/* Render the 'Hero' component */}
      <StyledTestimonials>
        <Heading2
          className={"heading2-testimonials"}
          text={"Stories of kindness"}
        />
        <TestimonialsCarousel />
      </StyledTestimonials>
    </StyledHomePage>
  );
};
