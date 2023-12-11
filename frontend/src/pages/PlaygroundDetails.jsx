//Detaljerad sida för varje lekplats

// PlaygroundDetails.jsx

// PlaygroundDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaygroundDetails = () => {
  const { id } = useParams();
  const [playgroundDetails, setPlaygroundDetails] = useState(null);

  useEffect(() => {
    // Log the URL before making the fetch request
    console.log("Fetching details for playground with ID:", id);

    // Fetch detailed information for the specific playground using the id
    const fetchPlaygroundDetails = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint/playground/${id}`);
        const data = await response.json();
        setPlaygroundDetails(data); // Assuming your API returns detailed playground information
      } catch (error) {
        console.error("Error fetching playground details:", error);
      }
    };

    fetchPlaygroundDetails();
  }, [id]); // Fetch playground details whenever the id parameter changes

  if (!playgroundDetails) {
    // Optional: Show a loading spinner or message while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{playgroundDetails.name}</h2>
      <p>{playgroundDetails.description}</p>
      {/* Add more details here based on your API response */}
    </div>
  );
};

export default PlaygroundDetails;

