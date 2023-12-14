import { Link } from "react-router-dom"; // Ensure the correct import for Link
// Import image assets for logos.
import aHelpingHandLogo from "/a-helping-hand-logo.png";

// Define the 'Logos' functional component.
function Logos() {
  return (
    <div>
      {/* Create a link to the A Helping Hand website that opens in a new tab. */}
      <Link to="/">
        {/* Display the A Helping Hand logo image with CSS classes 'logo'. */}
        <img
          src={aHelpingHandLogo}
          className="logo"
          alt="A Helping Hand logo"
        />
      </Link>
    </div>
  );
}

export default Logos;

// SUMMARY

// This code defines the Logos component, which displays logos of various technologies. It imports image assets for React, Technigo, and Vite logos. The component uses anchor (<a>) tags to create clickable links to the respective websites, and it opens those links in new tabs (target="_blank"). Each logo image is displayed within an anchor tag, and they have CSS classes for styling. The component is exported as the default export, making it available for use in other parts of the application.
