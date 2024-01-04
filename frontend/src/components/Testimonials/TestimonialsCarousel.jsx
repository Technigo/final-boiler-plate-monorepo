import { testimonials } from "./Testimonials.json";
import styled from "styled-components";

// Styled component for the carousel container
const CarouselContainer = styled.div`
  width: 100%; /* Set the width of the carousel */
  height: 100%;
  overflow: auto;
  display: flex; /* Display review cards side by side */
  scroll-behavior: smooth;
  gap: 12px;

  /* Custom scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 137, 155, 0.5) rgba(255, 255, 255, 0.8); /* thumb and track colors */
  margin: 10px 0;

  &::-webkit-scrollbar {
    width: 8px; /* width of the scrollbar */
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      100,
      137,
      155,
      0.5
    ); /* color of the scrollbar thumb */
    border-radius: 10px; /* rounded corners for thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(
      255,
      255,
      255,
      0.8
    ); /* color of the scrollbar track */
    border-radius: 6px; /* rounded corners for track */
  }
`;

// Styled component for the review card
const StyledReviewCard = styled.div`
  height: 290px;
  width: 225px; /* Set a width for each review card */
  flex-shrink: 0; /* Prevent cards from shrinking */
  padding-bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px 0 20px 20px;
  border: 1px solid #64899b;
  background: rgba(255, 255, 255, 0.8);

  img {
    height: 125px;
    width: 110px;
    object-fit: cover;
    border-radius: 20px 0 20px 20px;
    background: lightgray 50% / cover no-repeat;
  }
`;

const ReviewCardText = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  text-align: center;

  p {
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }
`;

const StyledReviewer = styled.div`
  display: flex;
  justify-content: flex-end;

  p .reviewer {
    text-align: center;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 115px;
  font-style: normal;
`;

export const TestimonialsCarousel = () => {
  return (
    <CarouselContainer>
      {testimonials.map((testimonial, index) => (
        <StyledReviewCard key={index}>
          <StyledReviewer>
            <StyledInfo>
              <p className="reviewer">{testimonial.reviewerName},</p>
              <p className="reviewer">{testimonial.reviewerAge} y/o</p>
            </StyledInfo>
            <img src={testimonial.imageUrl} alt={testimonial.imageAlt} />
          </StyledReviewer>
          <ReviewCardText>
            <p>{testimonial.review}</p>
          </ReviewCardText>
        </StyledReviewCard>
      ))}
    </CarouselContainer>
  );
};