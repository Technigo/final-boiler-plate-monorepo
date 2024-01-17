import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";

import { useAuth0 } from "@auth0/auth0-react";

export const TripDetails = () => {
  const { tripId } = useParams();
  const { loggedInUserId } = userStore();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const apiEnv = import.meta.env.VITE_BACKEND_API;

  const joinTrip = async () => {
    try {
      const response = await fetch(`${apiEnv}/trips/join/${tripId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSelectedTrip(data);
      } else {
        const errorResponse = await response.text();
        console.error("Error joining trip:", errorResponse);
      }
    } catch (error) {
      console.error("Error joining trip:", error);
    }
  };
  

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
    <>
    <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-lg mb-8 p-2">
  
      <h1 className="text-lg font-md">Trip details</h1>
      <div className="grid grid-cols-12 gap-2 bg-secondary-50 rounded-lg relative p-2"
        >
     
     <div className="col-span-5 text-xs bg-cyan-100">
          From
          </div>
          <div className="col-span-2 bg-pink-100">
          
          </div>
          <div className="col-span-5 text-xs bg-green-100">
          To
          </div>




          <div className="col-span-5 text-lg text-primary-900 font-semibold sm:text-4xl bg-slate-200">
          {selectedTrip.from}
          </div>
          <div className="col-span-2 flex items-center justify-center bg-fuchsia-300">
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

          <div className="col-span-5 text-lg text-right font-semibold sm:text-4xl bg-slate-200">
          {selectedTrip.to}
          </div>



          <div className="col-span-4 mt-2 text-xs">
          Date
          </div>
          <div className="col-span-5 mt-2 text-xs">
          User
          </div>
          <div className="col-span-3 mt-2 text-xs">
          Reg. No
          </div>



          <div className="col-span-4 flex items-center justify-center text-md sm:text-xl">
          {selectedTrip.date}
          </div>
          <div className="col-span-5 flex items-center justify-center text-md sm:text-xl bg-yellow-200">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>


</span> {selectedTrip.username}
          </div>
          <div className="col-span-3 flex items-center justify-center text-lg sm:text-xl font-semibold bg-white border border-primary-900 rounded-lg p-2">
          {selectedTrip.reg}
          </div>



          <div className="col-span-6 text-xs">
          Make
          </div>
          <div className="col-span-6 text-xs bg-pink-100">
          Model
          </div>
   
          <div className="col-span-6 flex items-center justify-center text-md sm:text-xl bg-secondary-200">
          {selectedTrip.make}
          </div>
          <div className="col-span-6 flex items-center justify-center text-md sm:text-xl bg-green-100">
          {selectedTrip.model}
          </div>


          
          <div className="col-span-6 text-xs bg-cyan-100">
          Avail. seats
          </div>
          <div className="col-span-6 text-xs bg-pink-100">
          Music
          </div>
   
          <div className="col-span-6 text-md sm:text-xl bg-green-100">
          {selectedTrip.availableSeats}
          </div>
          <div className="col-span-6 text-md sm:text-xl bg-amber-100">
          {selectedTrip.music}
          </div>


          <div className="col-span-12 text-xs bg-cyan-100">
          Message
          </div>

          <div className="col-span-12 text-md sm:text-xl bg-orange-200">
          {selectedTrip.message}
          </div>

          <div className="col-span-12 text-xs bg-cyan-100">
          Message
          </div>

          <div className="col-span-12 text-md sm:text-xl bg-orange-200">
          {selectedTrip.message}
          </div>


          </div>
          </div>


    </>
  );
};




{/* <div className="sm:mt-8 mt-2 mb-8 space-y-4 mx-auto max-w-screen-lg">
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
      {isAuthenticated && selectedTrip.user !== loggedInUserId && (
        <button
          type="button"
          onClick={joinTrip}
          className="bg-pink-400 rounded-full cursor-pointer hover:bg-cyan-800 text-white px-5 py-2 mt-8 font-semibold"
        >
          Join trip
        </button>
      )}
    </div>
  </div>
</div>
</div> */}