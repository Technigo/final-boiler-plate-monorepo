import { Link } from "react-router-dom"; // Ensure the correct import for Link
// Import image assets for logo.
import aHelpingHandLogo from "/a-helping-hand-logo.png";
import styled from "styled-components";

// STYLING I .LOGO I APP.CSS ÄR DET SOM TAR STYLINGEN, JUSTERA (Susanne kommenterade ut det i app.css när jag stylade login-sidan)
const StyledLogoText = styled.img`
  width: 300px;
  height: 200px; /* Set height for logo images */
  object-fit: cover;
  padding: 20px;
  will-change: filter; /* Specify a CSS property that may change */
  transition: filter 300ms; /* Apply a transition effect to the 'filter' property */
`;

// Lade in denna för att få loggan att hamna i mitten av sidan
const StyledLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Define the 'Logo' functional component.
function LogoText() {
  return (
    <StyledLogoDiv>
      <div className="logo-img">
        {/* Create a link to the A Helping Hand website that opens in a new tab. */}
        <Link to="/">
          {/* Display the A Helping Hand logo image with CSS classes 'logo'. */}
          <StyledLogoText
            src={aHelpingHandLogo}
            className="logo"
            alt="A Helping Hand logo"
          />
        </Link>
      </div>
    </StyledLogoDiv>
  );
}

export default LogoText;

// SUMMARY

// This code defines the Logo component, which displays logo of various technologies. It imports image assets for React, Technigo, and Vite logo. The component uses anchor (<a>) tags to create clickable links to the respective websites, and it opens those links in new tabs (target="_blank"). Each logo image is displayed within an anchor tag, and they have CSS classes for styling. The component is exported as the default export, making it available for use in other parts of the application.
