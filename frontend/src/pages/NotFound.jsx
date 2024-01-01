import { NotFoundAnimation } from "../components/Animations/NotFoundAnimation";
import { LinkButton } from "../components/Buttons/LinkButton";
import styled from "styled-components";

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 20px;
  }
`;

export const NotFound = () => {
  return (
    <StyledErrorPage>
      <NotFoundAnimation />
      <h2>Not Found</h2>
      <LinkButton
        to="/"
        className="backtohomepage-btn"
        buttonName="Back to homepage"
      />
    </StyledErrorPage>
  );
};
