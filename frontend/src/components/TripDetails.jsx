import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";

export const TripDetails = () => {
  const { tripId } = useParams();
  const { loggedInUserId } = userStore();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiEnv = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`${apiEnv}/trips/${tripId}`);
        const data = await response.json();
        setSelectedTrip(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    if (!tripId) {
      return;
    }

    fetchTrip();
  }, [tripId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sm:mt-8 mt-2 mb-8 space-y-4 mx-auto max-w-screen-lg">
      <h1 className="text-lg font-md">Trip details</h1>
      <div className="grid grid-cols-12 gap-4 border mb-8 p-4 rounded-lg">
        <div className="col-span-12 flex justify-center p-4">
          <div className="trip-info">
            <div className="info-item">Username: {selectedTrip.username}</div>
            <div className="info-item">From: {selectedTrip.from}</div>
            <div className="info-item">To: {selectedTrip.to}</div>
            <div className="info-item">Date: {selectedTrip.date}</div>
            <div className="info-item">Reg.no: {selectedTrip.reg}</div>
            <div className="info-item">
              Avail. seats: {selectedTrip.availableSeats}
            </div>
            <div className="info-item">Make: {selectedTrip.make}</div>
            <div className="info-item">Model: {selectedTrip.model}</div>
            <div className="info-item">Message: {selectedTrip.message}</div>
            {selectedTrip.user !== loggedInUserId && (
              <button
                type="button"
                className="bg-pink-400 rounded-full cursor-pointer hover:bg-cyan-800 text-white px-5 py-2 mt-8 font-semibold"
              >
                Join trip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
