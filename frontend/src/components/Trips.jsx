import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Trips = () => {
  const [trips, setTrips] = useState(null);
  const apiEnv = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    fetch(`${apiEnv}/trips`)
      .then((response) => response.json())
      .then((data) => {
        // Filter trips based on date
        const filteredTrips = data.filter((trip) => {
          const tripDate = new Date(trip.date);
          const currentDate = new Date();
          return tripDate >= currentDate;
        });
        setTrips(filteredTrips);
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  if (trips === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-lg mb-8 p-2">
      {console.log(trips)}
      <h1 className="text-lg font-md">Available trips</h1>
      {trips.map((trip) => (
        <div
          key={trip._id}
          className="grid grid-cols-12 gap-2  border rounded-lg relative"
        >
          <div className="col-span-5 text-lg text-primary-900 bg-secondary-300 p-4 sm:text-xl">
            {trip.from}
          </div>
          <div className="col-span-2 flex items-center justify-center text-lg text-primary-900 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>

          <div className="col-span-5 text-lg text-right text-primary-900 bg-primary-300 p-4 sm:text-xl">
            {trip.to}
          </div>

          <div className="col-span-6 text-md text-primary-900 bg-primary-200 p-4">
            {trip.date}
          </div>

          <div className="col-span-6 text-md text-right text-primary-900 bg-primary-200 p-4">
            🐖 {trip.username}
          </div>

          <div className="col-span-12 text-lg text-center text-primary-900 sm:text-xl p-4">
            <Link
              to={`/trips/${trip._id}`}
              className="bg-secondary-400 rounded-full cursor-pointer hover:bg-secondary-800 text-white px-5 py-2 font-semibold focus:outline-none focus:ring focus:border-primary-300"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
