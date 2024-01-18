import styled from "styled-components";

const StyledHeading2 = styled.h2`
  font-size: 32px;
  color: var(--lighttext);

  &.heading2-hero {
    color: var(--darktext);
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    display: none;

    @media screen and (min-width: 570px) {
      display: block;
    }

    @media screen and (min-width: 880px) {
      font-size: 18px;
    }

    @media screen and (min-width: 980px) {
      font-size: 22px;
    }
  }

  &.heading2-testimonials {
    font-size: 24px;

    @media screen and (min-width: 350px) {
      font-size: 32px;
    }
  }

  &.heading2-tasks {
    margin-bottom: 20px;
  }
`;

// Define a functional component 'Heading2' that takes 'className' and 'text' as props.
export const Heading2 = ({ className, text }) => {
  // Render the styled h2 element with the provided text and className.
  return <StyledHeading2 className={`${className}`}>{text}</StyledHeading2>;
};
