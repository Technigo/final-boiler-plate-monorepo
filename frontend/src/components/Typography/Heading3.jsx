import styled from "styled-components";

const StyledHeading3 = styled.h3`
  font-size: 1.5rem;
`;

export const Heading3 = ({ className, text }) => {
  return <h3 className={`${className}`}>{text}</h3>;
};
