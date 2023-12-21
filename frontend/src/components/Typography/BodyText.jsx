import styled from "styled-components";

const StyledBodyText = styled.p`
  font-size: 1rem;
`;

export const BodyText = ({ text }) => {
  return <p className="bodytext">{text}</p>;
};
