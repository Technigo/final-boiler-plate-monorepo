import styled from "styled-components";

const StyledHeading3 = styled.h3`
  font-size: 18px;
  color: var(--darktext);

  &.heading3-about {
    color: var(--lighttext);
  }
`;

// Define a functional component 'Heading3' that takes 'className' and 'text' as props.
export const Heading3 = ({ className, text }) => {
  // Render the styled h3 element with the provided text and className.
  return <StyledHeading3 className={`${className}`}>{text}</StyledHeading3>;
};
