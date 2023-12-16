import { Link } from "react-router-dom"; // Ensure the correct import for Link
// Import image assets for logo.
import aHelpingHandLogo from "/a-helping-hand-logo.png";
import styled from "styled-components";

// STYLING I .LOGO I APP.CSS ÄR DET SOM TAR STYLINGEN, JUSTERA
const StyledLogoText = styled.img`
  width: 300px;
  height: 200px; /* Set height for logo images */
  object-fit: cover;
  padding: 1.5em; /* Add padding around logo images */
  will-change: filter; /* Specify a CSS property that may change */
  transition: filter 300ms; /* Apply a transition effect to the 'filter' property */
`;

// Define the 'Logo' functional component.
function LogoText() {
  return (
    <div>
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
  );
}

export default LogoText;

// SUMMARY

// This code defines the Logo component, which displays logo of various technologies. It imports image assets for React, Technigo, and Vite logo. The component uses anchor (<a>) tags to create clickable links to the respective websites, and it opens those links in new tabs (target="_blank"). Each logo image is displayed within an anchor tag, and they have CSS classes for styling. The component is exported as the default export, making it available for use in other parts of the application.
