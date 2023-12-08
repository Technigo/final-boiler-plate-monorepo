// Import image assets for logos.
import reactLogo from "../assets/react.svg";
import technigoLogo from "../assets/technigo-logo.svg";
import viteLogo from "/vite.svg";

// Define the 'Logos' functional component.
function Logos() {
  return (
    <div>
      <div>
        {/* Create a link to the Vite website that opens in a new tab. */}
        <a href="https://vitejs.dev" target="_blank">
          {/* Display the Vite logo image with a CSS class 'logo'. */}
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        {/* Create a link to the React website that opens in a new tab. */}
        <a href="https://react.dev" target="_blank">
          {/* Display the React logo image with CSS classes 'logo' and 'react'. */}
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {/* Create a link to the Technigo website that opens in a new tab. */}
        <a href="https://www.technigo.io/" target="_blank">
          {/* Display the Technigo logo image with CSS classes 'logo' and 'technigo'. */}
          <img
            src={technigoLogo}
            className="logo technigo"
            alt="Technigo logo"
          />
        </a>
      </div>
    </div>
  );
}

// Export the 'Logos' component as the default export.
export default Logos;

// SUMMARY

// This code defines the Logos component, which displays logos of various technologies. It imports image assets for React, Technigo, and Vite logos. The component uses anchor (<a>) tags to create clickable links to the respective websites, and it opens those links in new tabs (target="_blank"). Each logo image is displayed within an anchor tag, and they have CSS classes for styling. The component is exported as the default export, making it available for use in other parts of the application.
