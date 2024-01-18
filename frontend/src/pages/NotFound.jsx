import { NotFoundAnimation } from "../components/Animations/NotFoundAnimation";
import { LinkButton } from "../components/Buttons/LinkButton";
import { Heading1 } from "../components/Typography/Heading1";
import styled from "styled-components";

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NotFound = () => {
  return (
    <StyledErrorPage>
      <NotFoundAnimation />
      <Heading1 className={"heading1-notfound"} text={"Not Found"} />
      <LinkButton
        to="/"
        className="backtohomepage-btn"
        buttonName="Back to homepage"
      />
    </StyledErrorPage>
  );
};
