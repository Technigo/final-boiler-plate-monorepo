import { TripsInMyTrips } from "../components/TripsInMyTrips";

export const MyTrips = () => {
  return (
    <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-md mb-8 p-2">
      <h1 className="text-lg font-md">My Trips</h1>
      <div className="grid grid-cols-12 bg-background rounded-lg relative p-4"></div>
      <>
        <TripsInMyTrips />
      </>
    </div>
  );
};
