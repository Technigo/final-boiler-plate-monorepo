// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import { adStore } from "../stores/adStore";
import { userStore } from "../stores/userStore";
import { Link } from "react-router-dom";
import { AdCard } from "./AdCard";

// Define the 'ads' functional component.
export const YourAds = () => {
  // Access the 'ads', 'fetchads', 'handleEdit', and 'deleteTaskById' functions from the 'advertStore'.
  const { ads, fetchAds } = adStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();

  // Use the 'useEffect' hook to fetch ads when 'ads' or 'accessToken' change.
  useEffect(() => {
    fetchAds();
  }, [fetchAds, ads, accessToken]);

  // Render the component content.
  return (
    <>
      <div>
        {/* Display the heading and paragraphs. */}
        <h1>Your products</h1>

        {/* Conditional rendering based on the number of ads. */}
        {ads.length === 0 ? (
          <>
            <p>You don&apos;t have any product...</p>
          </>
        ) : (
          // Map through 'ads' and render task items.
          ads.map((ad) => (
            <div key={ad._id} className="card-wrapper">
              <AdCard ad={ad}/>
            </div>
          ))
        )}    
        <Link to="/create-ad">+ Add a product</Link>
      </div>
    </>
  );
};

// SUMMARY

// This code defines the ads component, which handles the display of ads, their creation, editing, and deletion. It imports necessary components, hooks, and stores, and it uses React Router to navigate between routes. The component also fetches ads from the server using the fetchads function and updates the display based on the user's authentication status. Additionally, it renders text content and conditionally displays ads or a message when there are no ads.
