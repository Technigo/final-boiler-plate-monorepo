import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const TripDetails = () => {
  const { tripId } = useParams();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const apiEnv = import.meta.env.VITE_BACKEND_API;
  const localhost = "http://localhost:3000";

  useEffect(() => {
    // console.log(tripId);
    // console.log("Fetching trip details for tripId:", tripId);
    console.log(`${apiEnv}/trips/${tripId}`);
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

    const fetchTrip = async () => {
      const response = await fetch(`${apiEnv}/trips/${tripId}`);
      const data = await response.json();
      setSelectedTrip(data);
      console.log("user from selectedtrip: " + selectedTrip.user);
      setUser(selectedTrip.user);
      setIsLoading(false);
      console.log("user: " + user);

      // console.log(`${localhost}/user/mongo/${user}`);
      // const call2 = await fetch(`${localhost}/user/mongo/${user}`);
      // const data2 = call2.json();
      // setUsername(JSON.stringify(data2.username));
      // console.log(username);
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }
      //   return response.json();
      // })
      // .then((data) => {
      //   console.log("tripData: " + data);
      //   setSelectedTrip(data);
      // })
      // .catch((error) => console.error("Error fetching trip details:", error));
    };

    const fetchUsername = async () => {
      console.log(
        `The address is ${localhost}/user/mongo/${selectedTrip.user}`
      );
      const response = await fetch(
        `${localhost}/user/mongo/${selectedTrip.user}`
      );
      console.log(JSON.stringify(response));
      const data = response.json();
      console.log("data from fetchUsername: " + JSON.stringify(data.username));
      setUsername(data.username);
      console.log("username: " + username);
    };
    fetchTrip();
    if (!isLoading) {
      fetchUsername();
    }
  }, []);

  if (!selectedTrip) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="sm:mt-8 mt-2 mb-8 space-y-4 mx-auto max-w-screen-lg">
        <h1 className="text-lg font-md">Trip details</h1>
        <div className="grid grid-cols-12 gap-4 bg-secondary mb-8 p-4 rounded-lg">
          <div className="col-span-12 flex justify-center p-4">
            <div className="trip-info">
              <div className="info-item">User: {selectedTrip.user}</div>
              <div className="info-item">Username: {username}</div>
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

              <button
                type="button"
                className="bg-pink-400 rounded-full cursor-pointer hover:bg-cyan-800 text-white px-5 py-2 mt-8 font-semibold"
              >
                Join trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
