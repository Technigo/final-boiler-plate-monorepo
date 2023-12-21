import styled from "styled-components";

const StyledHeading2 = styled.h2`
  font-size: 2rem;
`;

export const Heading2 = ({ className, text }) => {
  return <h2 className={`${className}`}>{text}</h2>;
};
