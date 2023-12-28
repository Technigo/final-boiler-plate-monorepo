import styled from "styled-components";

const StyledHeading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const Heading1 = ({ className, text }) => {
  return <h1 className={`${className}`}>{text}</h1>;
};
