import { useState, useEffect } from "react";
import { TripDetails } from "./TripDetails";

export const Trips = () => {
  const [trips, setTrips] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/trips")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          setTrips([data]);
        }
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  if (trips === null) {
    return <p>Loading...</p>;
  }

  const handleDetailsClick = (trip) => {
    setSelectedTrip(trip);
  };

  return (
    <>
      {trips.length > 0 && (
        <div className="mt-8 space-y-4">
          <h1 className="text-lg font-md">Trips.jsx</h1>
          {trips.reverse().map((trip) => (
            <div
              key={trip.id}
              className="grid grid-cols-12 gap-2 p-4 bg-yellow-100 rounded-lg relative">
              <div className="col-span-4 text-md text-gray-900 sm:text-xl">
                {trip.from}
              </div>

              <div className="col-span-1 text-md text-gray-900 text-center sm:text-xl">
                →
              </div>

              <div className="col-span-4 text-md text-gray-900 sm:text-xl">
                {trip.to}
              </div>

              <div className="col-span-3"></div>

              <div className="col-span-3 text-xs text-gray-900 sm:text-lg">
                {trip.date}
              </div>
              <div className="col-span-2 text-xs text-gray-900 sm:text-lg">
                {trip.time}
              </div>
              <div className="col-span-4 text-xs text-gray-900 sm:text-lg">
                NO USER
              </div>
              <div className="col-span-3"></div>

              <div className="col-span-3 absolute right-4 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDetailsClick(trip)}
                  className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTrip && (
        <TripDetails
          selectedTrip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </>
  );
};
