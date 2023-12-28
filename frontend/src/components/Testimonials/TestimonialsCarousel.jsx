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
  padding: 0 24px;
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* WebKit (Chrome, Safari, etc.) */
  }
`;

// Styled component for the review card
const StyledReviewCard = styled.div`
  height: 100%;
  width: 300px; /* Set a width for each review card */
  flex-shrink: 0; /* Prevent cards from shrinking */
  padding-bottom: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  border: 0.5px solid rgba(255, 163, 134, 0.5);
  background: rgba(255, 255, 255, 0.8);

  img {
    height: 360px;
    width: 300px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    background: lightgray 50% / cover no-repeat;
  }

  /* @media screen and (min-width: 1024px) and (max-width: 1360px) {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      height: 220px;
      width: 100%;
    }
  }

  @media screen and (min-width: 1360px) {
    width: 100%;
    height: 380px;

    img {
      height: 220px;
      width: 100%;
    }
  } */
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
    color: #202537;
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }

  p.reviewer {
    font-style: normal;
  }
`;

export const TestimonialsCarousel = () => {
  return (
    <CarouselContainer>
      {testimonials.map((testimonial, index) => (
        <StyledReviewCard key={index}>
          <img src={testimonial.imageUrl} alt={testimonial.imageAlt} />
          <ReviewCardText>
            <p>{testimonial.review}</p>
            <p className="reviewer">
              {testimonial.reviewerName}, {testimonial.reviewerAge} y/o
            </p>
          </ReviewCardText>
        </StyledReviewCard>
      ))}
    </CarouselContainer>
  );
};
