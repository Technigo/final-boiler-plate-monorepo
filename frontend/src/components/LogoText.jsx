import { Link } from "react-router-dom";
import aHelpingHandLogo from "/a-helping-hand-white.png";
import styled from "styled-components";

const StyledLogoText = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  will-change: filter;
  transition: filter 300ms;

  @media screen and (min-width: 600px) {
    width: 250px;
  }

  @media screen and (min-width: 800px) {
    width: 300px;
  }
`;

const StyledLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LogoText() {
  return (
    <StyledLogoDiv>
      <>
        {/* Create a link to the A Helping Hand website that opens in a new tab. */}
        <Link to="/">
          {/* Display the A Helping Hand logo image. */}
          <StyledLogoText
            src={aHelpingHandLogo}
            className="logo"
            alt="A Helping Hand logo"
          />
        </Link>
      </>
    </StyledLogoDiv>
  );
}

export default LogoText;
