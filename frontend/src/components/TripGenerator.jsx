import { useState, useEffect } from "react";

export const TripGenerator = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    description: "",
    date: "",
    time: "",
  });

  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.origin ||
      !formData.destination ||
      !formData.description ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);

    const newTrip = {
      id: Date.now(),
      origin: formData.origin,
      destination: formData.destination,
      description: formData.description,
      date: formData.date,
      time: formData.time,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTrips([...trips, newTrip]);

    setFormData({
      origin: "",
      destination: "",
      description: "",
      date: "",
      time: "",
    });

    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700">
            Origin:
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>

      {trips.length > 0 && (
        <div className="mt-8 space-y-4">
          <h1 className="text-xl font-bold">Trips</h1>
          {trips.map((trip) => (
            <div key={trip.id} className="bg-green-200 p-4 rounded-md">
              <h3 className="text-lg font-bold text-black">
                {trip.origin} to {trip.destination}
              </h3>
              <p className="text-gray-700 truncate">{trip.description}</p>
              <p className="text-gray-500 mt-1">Date: {trip.date}</p>
              <p className="text-gray-500">Time: {trip.time}</p>
              <p className="text-green-700 text-xs mt-1">ID: {trip.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
