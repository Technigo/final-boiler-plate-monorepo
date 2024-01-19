import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";

export const Trips = () => {
  const [trips, setTrips] = useState(null);
  const apiEnv = import.meta.env.VITE_BACKEND_API;
  const { loggedInUserId } = userStore();

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

  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(`${apiEnv}/deletetrip/${tripId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (trips === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-md mb-8 p-2">
      {console.log(trips)}
      <h1 className="text-lg font-md">Available trips</h1>
      {trips.map((trip) => (
        <div
          key={trip._id}
          className="grid grid-cols-12 gap-2 bg-background rounded-lg relative p-4">
          <div className="col-span-5 text-lg text-primary-900 font-semibold sm:text-4xl">
            {trip.from}
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>

          <div className="col-span-5 text-lg text-right font-semibold sm:text-4xl">
            {trip.to}
          </div>

          <div className="col-span-3 flex items-center text-xs text-primary-900 sm:text-lg">
            {trip.date}
          </div>

          <div className="col-span-6 flex items-center justify-center text-xs text-primary-900 sm:text-lg">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1">
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {trip.username}
          </div>

          <div className="col-span-3 flex items-center justify-end text-xs text-primary-900 sm:text-lg">
            <Link
              to={`/trips/${trip._id}`}
              className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring focus:border-blue-300 flex items-center">
              Details{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>

          {trip.user === loggedInUserId && (
            <div className="col-span-12 flex items-center justify-center text-xs text-primary-900 sm:text-lg mt-4">
              <button
                onClick={() => deleteTrip(trip._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none border border-red-500 hover:border-red-700 focus:ring focus:border-blue-300 p-2 rounded-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-1">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Delete trip
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
