import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const TripDetails = () => {
  const { tripId } = useParams();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const apiEnv = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    console.log("Fetching trip details for tripId:", tripId);
    if (!tripId) {
      return;
    }

    //   fetch(`http://localhost:3000/trips/${tripId}`)
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setSelectedTrip(data);
    //     })
    //     .catch((error) => console.error("Error fetching trip details:", error));
    // }, [tripId]);

    fetch(`${apiEnv}/trips/${tripId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSelectedTrip(data);
      })
      .catch((error) => console.error("Error fetching trip details:", error));
  }, [tripId]);

  if (!selectedTrip) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container rounded-lg p-4 bg-gray-100 mt-8 space-y-4 mx-auto max-w-screen-lg mb-8">
      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex justify-center">
            <button
              type="button"
              className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Join trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
